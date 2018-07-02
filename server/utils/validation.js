let isRealString = (str)=>{
	return typeof str === 'string' && str.trim().length > 0;
};

let isNameExist = (paramName, userName)=>{
	return paramName.toLowerCase() === userName.toLowerCase();
}
module.exports = {isRealString, isNameExist};