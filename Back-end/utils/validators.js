
const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return "not in email format"
    }
    return undefined
}

const isImage = (fileName) => {
    // Get the file extension
  const fileExtension = fileName.split('.').pop().toLowerCase();

  // List of allowed image file extensions
  const allowedExtensions = ['png', 'jpg', 'jpeg'];

  // Check if the file extension is in the allowed list
  if(!allowedExtensions.includes(fileExtension)){
    return `${fileExtension} is not allowed`
  }
  return undefined
}

function isURL(url) {
    // Regular expression for a basic URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if(!urlRegex.test(url)){
        return "not in url format"
    }
    return undefined
  }
