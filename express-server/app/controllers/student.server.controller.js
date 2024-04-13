// Load the module dependencies
const Student = require('mongoose').model('Student');
const Course = require('mongoose').model('Course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new error handling controller method
const getErrorMessage = function(err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs, get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs, set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs, set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};

// Create a new student
exports.createStudent = function(req, res, next) {
    // Create a new instance of the 'Student' Mongoose model
    var student = new Student(req.body); // Get data from React form

    // Use the 'Student' instance's 'save' method to save a new student document
    student.save(function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
        }
    });
};

// Returns all students
exports.listStudents = function(req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve all student documents
    Student.find({}, function(err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

// Read a student by ID
exports.getStudentById = function(req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.student);
};

// Find a student by its ID
exports.findStudentById = function(req, res, next, id) {
    // Use the 'Student' static 'findOne' method to retrieve a specific student
    Student.findOne({
        _id: id
    }, (err, student) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.student' property
            req.student = student;
            // Call the next middleware
            next();
        }
    });
};

// Update a student by ID
exports.updateStudent = function(req, res, next) {
    // Update the existing student document using the 'Student' instance's 'save' method
    req.student.updateOne(req.body, function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(req.student);
        }
    });
};
// List all courses taken by a student using student ID
exports.listCoursesByStudentId = async(req, res, next)=> {
  
	try {
        // Extract the student ID from the request parameters
        const studentId = req.params.studentId;

        // Find all courses where the student ID is present in the 'students' array
        const courses = await Course.find({ students: studentId });
		console.log('Courses:', courses);
        // Check if any courses are found
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for the student' });
        }

        // Return the courses associated with the student
        res.status(200).json(courses);
    } catch (err) {
        // Handle any errors
        return next(err);
    }
                 
};

// List all students taking a specific course
exports.listStudentsByCourse = async function(req, res) {
    try {
        // Extract the course ID 
        const courseId = req.params.courseId;
		console.log('Course ID:', courseId);
       // Find all courses where the student ID is present in the 'students' array
	   const courses = await Course.find({});
		console.log('Courses:', courses);
        // Extract student IDs 
        const studentIds = courses.flatMap(course => course.students);
		console.log('Student IDs:', studentIds);
        // Find all students 
        const students = await Student.find({ _id: { $in: studentIds } });

        if (!students || students.length === 0) {
            return res.status(404).json({
                message: 'No students found for the specified course'
            });
        }

        // display student names and IDs
        const studentDetails = students.map(student => ({
            studentId: student.studentNumber,
            studentName: `${student.firstName} ${student.lastName}`
        }));

      
        res.status(200).json(studentDetails);
    } catch (error) {
        
        res.status(400).json({
            message: 'Error fetching students for course: ' + error.message
        });
    }
};


// Delete a student by ID
exports.deleteStudent = function(req, res, next) {
    // Use the 'Student' instance's 'remove' method to delete a student document
    req.student.remove(function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(req.student);
        }
    });
};
//
// authenticates a user
// exports.authenticate = function(req, res, next) {
// 	// Get credentials from request
// 	console.log(req.body)
// 	const username = req.body.auth.username;
// 	const password  = req.body.auth.password;
// 	console.log(password)
// 	console.log(username)
// 	//find the user with given username using static method findOne
// 	User.findOne({username: username}, (err, user) => {
// 			if (err) {
// 				return next(err);
// 			} else {
// 			console.log(user)
// 			//compare passwords	
// 			if(bcrypt.compareSync(password, user.password)) {
// 				// Create a new token with the user id in the payload
//   				// and which expires 300 seconds after issue
// 				const token = jwt.sign({ id: user._id, username: user.username }, jwtKey, 
// 					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
// 				console.log('token:', token)
// 				// set the cookie as the token string, with a similar max age as the token
// 				// here, the max age is in milliseconds
// 				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
// 				res.status(200).send({ screen: user.username });
// 				//
// 				//res.json({status:"success", message: "user found!!!", data:{user:
// 				//user, token:token}});
				
// 				req.user=user;
// 				//call the next middleware
// 				next()
// 			} else {
// 				res.json({status:"error", message: "Invalid username/password!!!",
// 				data:null});
// 			}
			
// 		}
		
// 	});
// };
exports.authenticate = function(req, res, next) {
    // Get credentials from request
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;

	console.log("Request Body:", req.body);

	console.log("Received studentNumber:", studentNumber);
    console.log("Received password:", password);
    // Find the student with the given studentNumber
    Student.findOne({ studentNumber: studentNumber }, (err, student) => {
        if (err) {
			console.error("Error finding student:", err);
            return next(err);
        } else {
			console.log("Found student:", student);
            // Check if the student exists
            if (!student) {
				console.error("Student not found.");
                return res.status(401).json({ status: "error", message: "Invalid username/password", data: null });
            }

            // Compare passwords
            if (bcrypt.compareSync(password, student.password)) {
                // Create a new token with the student id in the payload
                // and which expires after a certain time
				console.log("Password matched.");
                const token = jwt.sign({ id: student._id, studentNumber: student.studentNumber }, jwtKey, 
                    { algorithm: 'HS256', expiresIn: jwtExpirySeconds });

                // Set the token as a cookie
                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
                res.status(200).send({ screen: student.studentNumber });
                // // Send the student's data and token as response
                // res.status(200).json({ status: "success", message: "Authentication successful", data: { student: student, token: token } });

                // Set the student data in the request object for further processing
                req.student = student;

                // Call the next middleware
                next();
            } else {
                // Send error response for invalid password
                res.status(401).json({ status: "error", message: "Invalid username/password", data: null });
            }
        }
    });
};

//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the user, along with their
	// username given in the token
	// use back-quotes here
	res.send(`${payload.username}`)
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the user back to the main application page
	//res.redirect('/');
}
//check if the user is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).send({ screen: payload.username });
}

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// user is authenticated
	//call next function in line
    next();
};

