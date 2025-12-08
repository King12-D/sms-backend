import studentmodel from "./student.models";

async function generateStudentId() {
  let maxattempts = 5;
  let studentId;
  for (let i = 0; i < maxattempts; i++) {
    studentId = Math.floor(100000 + Math.random() * 900000);
    const exists = await studentmodel.exists({ studentid: studentId });
    if (!exists) {
        return studentId
      break;
    }
}
throw new Error("Unable to generate unique student ID, try again later.");
}

export async function createStudent(req, res) {
  try {
    const { age, studentClass } = req.body;
    const StudentId = await generateStudentId();
    if (!age || typeof age !== "number") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Age is required and must be a number",
        });
    }

    const validClasses = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
    if (!studentClass || !validClasses.includes(studentClass)) {
      return res.status(400).json({
        success: false,
        message: `studentClass is required and must be  one of: ${validClasses.join(
          ","
        )}`,
      });
    }
    const newStudent = new studentmodel({
      studentClass,
      age,
      studentid: StudentId,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: savedStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
}
