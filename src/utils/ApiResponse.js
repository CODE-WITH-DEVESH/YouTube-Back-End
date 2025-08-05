// ApiResponse naam ki ek class bana rahe hain jo successful API response handle karne ke kaam aati hai
class ApiResponse {
    
    // Constructor ke andar teen cheezein le rahe hain:
    // statusCode -> HTTP status jaise 200, 201
    // data       -> jo bhi actual data response mein bhejna hai
    // message    -> ek message, default "Success" hai
    constructor (statusCode , data, message ="Success") {
        
        this.statusCode = statusCode  // HTTP status code set kar rahe hain
        this.data = data              // Jo bhi data bhejna hai usko set kar rahe hain
        this.message = message        // Success ya custom message set kar rahe hain

        // success true hoga agar status code 400 se chhota hai, warna false
        // Kyunki 400+ ka matlab error hota hai
        this.success = statusCode < 400
    }

}


// 🔎 Interview mein agar koi pooche:
// ❓"ApiResponse class kyun banayi?"
// 👉 "Taaki hum har API response ko ek consistent format mein bhej saken — statusCode, data, message, aur success flag ke sath."

// ❓"success flag ka kya use hai?"
// 👉 "Ye batata hai ki API request successful thi ya nahi, aur ye status code pe based hota hai. Agar 400 se chhota hai to success true hota hai."