const supabase = require('../config/supabase')

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, studentId, departmentId, courseId, semester, phone, dateOfBirth, address } = req.body

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || 'student'
        }
      }
    })

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message
      })
    }

    if (!authData.user) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create user'
      })
    }

    // Create profile in profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        name,
        role: role || 'student',
        student_id: studentId,
        department_id: departmentId,
        course_id: courseId,
        semester,
        phone,
        date_of_birth: dateOfBirth,
        address
      })
      .select()
      .single()

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      await supabase.auth.admin.deleteUser(authData.user.id)
      return res.status(400).json({
        success: false,
        message: 'Failed to create user profile'
      })
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: profileData.name,
        role: profileData.role,
        studentId: profileData.student_id
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Login with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      return res.status(401).json({
        success: false,
        message: 'User profile not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile.name,
        role: profile.role,
        studentId: profile.student_id
      },
      session: data.session
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Logout failed'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        departments(name, code),
        courses(name, code)
      `)
      .eq('id', userId)
      .single()

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      })
    }

    res.status(200).json({
      success: true,
      data: profile
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Refresh token (handled by Supabase client)
// @route   POST /api/auth/refresh
// @access  Public
exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body

    if (!refresh_token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      })
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    })

    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      })
    }

    res.status(200).json({
      success: true,
      session: data.session
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    })
  }
}