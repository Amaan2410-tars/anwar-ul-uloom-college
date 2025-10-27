const supabase = require('../config/supabase')

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
exports.getDepartments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to fetch departments'
      })
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Public
exports.getDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('departments')
      .select(`
        *,
        profiles!departments_head_of_department_fkey(name, email, phone)
      `)
      .eq('id', id)
      .single()

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }

    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Create department
// @route   POST /api/departments
// @access  Private (Admin only)
exports.createDepartment = async (req, res) => {
  try {
    const { name, code, description, headOfDepartment, email, phone } = req.body

    const { data, error } = await supabase
      .from('departments')
      .insert({
        name,
        code,
        description,
        head_of_department: headOfDepartment,
        email,
        phone
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create department'
      })
    }

    res.status(201).json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin only)
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const { data, error } = await supabase
      .from('departments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to update department'
      })
    }

    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin only)
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('departments')
      .update({ is_active: false })
      .eq('id', id)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete department'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}
