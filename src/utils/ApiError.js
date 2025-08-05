// Ek custom error class bana rahe hain jo 'Error' class ko extend kar rahi hai
class ApiError extends Error {
  constructor(
    statusCode,             // Ye HTTP error code hai jaise 404, 500, 401, etc.
    message = 'Something Went Wrong',  // Default message agar koi message na mile
    errors = [],            // Agar multiple errors ho to unka array
    statck = ''             // Custom stack trace agar dena ho
  ) {
    super(message); // Parent class (Error) ke constructor ko call kar rahe hain

    this.statusCode = statusCode;  // Error ka HTTP status code set kar rahe hain
    this.data = null;              // By default data null rahega
    this.message = message;       // Jo message diya gaya hai, wahi set kar rahe hain
    this.success = false;         // Kyunki ye error hai to success false hoga
    this.errors = errors;         // Error details ya multiple errors ka array

    // Agar stack trace diya gaya hai to use hi use karenge
    if (statck) {
      this.stack = statck;
    } else {
      // Nahi to default stack trace generate karenge
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Is class ko export kar rahe hain taki doosri file mein import karke use kar saken
export { ApiError };




// 🔎 Interview mein agar koi pooche:
// ❓"ApiError class kyun banayi?"
// 👉 "Taaki custom error handling kar saken backend mein. Jab API se koi error aaye to usko hum properly status code, message, aur extra details ke sath bhej saken."

// ❓"captureStackTrace ka kya kaam hai?"
// 👉 "Ye JavaScript ka built-in method hai jo error ki exact location batata hai jahan se error aaya hai, debugging mein help karta hai."