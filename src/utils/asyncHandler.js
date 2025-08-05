// Ye ek higher order function hai jiska kaam hai async functions ko handle karna
// Matlab: agar kisi async function me error aaye to usse pakadke next middleware ko pass kar de
const asyncHandler = (requestHandler) => {
    
    // Ye function ek middleware return kar raha hai
    // Jo req, res, aur next ko accept karta hai (Express ka pattern hai)
    (req, res, next) => {
        // Promise.resolve ka matlab hai: agar requestHandler ek async function hai
        // to usko promise mein convert karke .catch se error pakad lenge
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
        // Agar koi error aaya to Express ka next(err) call ho jaayega
        // Jo ki error-handling middleware ko le jaata hai
    }

}

// Is function ko export kar rahe hain taaki doosri file me use ho sake
export { asyncHandler };
