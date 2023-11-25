
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

const isEmpty = (attribute, text) => {
    if (!text) return `${attribute} is required`
    return undefined
}

const isTime = (time) => {
    const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if(!timePattern.test(time)){
        return "not in time format"
    }
    return undefined
}

const isDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
        return "not in date format"
    }
    return undefined
}


console.log(isDate('2022-10-hh'))
