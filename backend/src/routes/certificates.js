const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const Certificate = require('../models/Certificate')
const { protect, authorize } = require('../middleware/auth')
const User = require('../models/User')

// @desc    Generate certificate
// @route   POST /api/certificates/generate
// @access  Private/Admin
router.post('/generate', protect, authorize('admin'), async (req, res) => {
  try {
    const { studentId, certificateType, courseId, departmentId } = req.body

    // Get student info
    const student = await User.findById(studentId)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    // Generate certificate HTML
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            @page { size: A4 landscape; margin: 0; }
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 60px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .certificate {
              background: white;
              padding: 60px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              text-align: center;
            }
            h1 {
              color: #0b4da2;
              font-size: 48px;
              margin-bottom: 10px;
              border-bottom: 3px solid #0b4da2;
              padding-bottom: 20px;
            }
            .subtitle {
              font-size: 24px;
              color: #666;
              margin-bottom: 40px;
            }
            .content {
              font-size: 20px;
              line-height: 1.8;
              margin: 40px 0;
            }
            .name {
              font-size: 36px;
              color: #0b4da2;
              font-weight: bold;
              margin: 30px 0;
            }
            .signature {
              margin-top: 80px;
              display: flex;
              justify-content: space-between;
            }
            .signature-item {
              text-align: center;
              width: 40%;
            }
            .signature-line {
              border-top: 2px solid #333;
              margin-top: 60px;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>CERTIFICATE</h1>
            <p class="subtitle">Anwar-ul-Uloom College</p>
            <div class="content">
              This is to certify that <span class="name">${student.name}</span>
              has successfully completed the requirements for ${certificateType} certificate.
              ${student.studentId ? `<br>Student ID: ${student.studentId}` : ''}
              ${new Date().getFullYear() ? `<br>Year: ${new Date().getFullYear()}` : ''}
            </div>
            <div class="signature">
              <div class="signature-item">
                <div class="signature-line">Registrar</div>
              </div>
              <div class="signature-item">
                <div class="signature-line">Principal</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setContent(certificateHTML, { waitUntil: 'networkidle0' })
    
    const timestamp = Date.now()
    const filename = `certificate_${student._id}_${timestamp}.pdf`
    const filepath = path.join(__dirname, '../../uploads/certificates', filename)
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    await page.pdf({
      path: filepath,
      format: 'A4',
      landscape: true,
      printBackground: true
    })

    await browser.close()

    // Save certificate record
    const certificate = await Certificate.create({
      studentId: student._id,
      certificateType,
      course: courseId,
      department: departmentId,
      certificateNumber: `CERT-${Date.now()}`,
      pdfUrl: `/uploads/certificates/${filename}`,
      status: 'issued',
      approvedBy: req.user._id
    })

    res.status(200).json({
      success: true,
      message: 'Certificate generated successfully',
      certificate,
      downloadUrl: `/api/certificates/${certificate._id}/download`
    })
  } catch (error) {
    console.error('Certificate generation error:', error)
    res.status(500).json({
      success: false,
      message: 'Error generating certificate',
      error: error.message
    })
  }
})

// @desc    Download certificate
// @route   GET /api/certificates/:id/download
// @access  Private
router.get('/:id/download', protect, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      })
    }

    // Check if user has access
    if (certificate.studentId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    const filepath = path.join(__dirname, '../..', certificate.pdfUrl)

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: 'Certificate file not found'
      })
    }

    res.download(filepath)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error downloading certificate',
      error: error.message
    })
  }
})

module.exports = router
