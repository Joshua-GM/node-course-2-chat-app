const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=>{
	it('should reject non-string values', ()=>{
		let str = 12345;
		let res = isRealString(str);
		expect(res).toBe(false);
	})

	it('should reject string with only spaces',()=>{
		let str = '         ';
		let res = isRealString(str);
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters', ()=>{
		let str = ' LOTR ';
		let res = isRealString(str);
		expect(res).toBe(true);
	});
});