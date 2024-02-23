module.exports = {
	isEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
            return true
        }
        return false
    },
    
    isURL: (url)=>{
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		
        if(urlRegex.test(url)){
            return true
        }
		return false
	},
    
    isEmpty: (value) => {
        if (value === null || value === undefined) {
			return true;
		}
        
        if (typeof value === 'string' && value.trim() === '') {
			return true;
		}
        
		if (Array.isArray(value) && value.length === 0) {
			return true;
		}
        
		if (typeof value === 'object' && Object.keys(value).length === 0) {
			return true;
		}
        
		return false;
    },
    
	isTime: (time) => {
		const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if(timePattern.test(time)){
            return true
        }
        return false
    },
    
    isDate: (date) => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (datePattern.test(date)) {
            return true
        }
        return false
    },
    isDateTime: (dateTime)=>{
        const dateTimePattern = /^\d{4}-\d{2}-\d{2} ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
        if (dateTimePattern.test(dateTime)) {
            return true
        }
        return false
    },
    isNotNumber: (data) => {
        return isNaN(data)
    },
    isTimes: (times)=>{
        console.log("times is "+ times+ " length is "+times.length)
        if(times.length!=2)
        {
            console.log('length')
            return false
        }
        else if(times[0]>=times[1]||times[0]>23||times[0]<7||times[1]>23){
            console.log('comparison')
            return false
        }
        return true
    }
}