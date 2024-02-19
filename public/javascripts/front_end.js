/*
NUMBER SYSTEM CONVERSION
*/


//[FUNCTION TO CONVERT FORM DECIMAL TO OTHER]
function decimalToOther(num, base, flag){ //num is string
    //variables and array declared
    let parts = []; //stores integer and fractional parts of i/p
    let arrRem = []; //stores remainders to be shown in o/p
    let arrQuo = []; //stores quotient
    let arrPdt = []; //stores integer part of product of fractional part and base
    let arrFrac = []; //stores fractional parts
    let arrFrac2 = []; //stores manipulated fractional part
    let pos = 0; //stores index at which results to be stored
    let whole; //stores integer part of i/p
    let frac; //stores fractional part of i/p
    let result; //stores final result
    let remainder; //stores remainder for division
    let digit; //stores calculated integer part of frac*base
    
    whole = parseInt(num);
    frac = parseFloat(num) - whole;
    parts[0] = whole;
    parts[1] = frac;

    //integer part
    if(whole > 0){
        result = "", pos = 0;
        while(whole > 0){
            remainder = whole%base;
            arrRem[pos] = remainder;
            if(remainder > 9){ //hexadecimal cases
                result = String.fromCharCode(remainder+55) + result;
                arrRem[pos] = arrRem[pos]+" ("+String.fromCharCode(remainder+55)+")";
            }
            else{
                result = remainder + result;}
            whole = parseInt(whole/base);
            arrQuo[pos] = whole;
            pos++;
        }
    }
    else result = "0";
    
    //fractional part
    if(frac > 0){
        result += ".";
        pos = 0;
        for (let i = 0; i < 6; i++){
            arrFrac[pos] = frac;
            frac = frac*base;
            arrFrac2[pos] = frac;
            if(frac == 0){break;}
            digit = parseInt(frac);
            if(digit > 9) digit = String.fromCharCode(digit+55); // res = parseFloat((res+digit).toFixed(precision));//hexadecimal cases
            result = result + digit;
            arrPdt[pos] = digit;
            frac = frac-parseInt(frac);
            pos++;
        }
    }

    if(flag == 1) displayDecimalToOther(parts, base, arrQuo, arrRem, arrFrac, arrPdt, arrFrac2); //if process for o/p required
    // console.log(result);
    return result;
}


//[FUNCTION TO PRINT PROCESS FOR CONVERTING DECIMAL TO OTHER BASE]
function displayDecimalToOther(parts, base, arrQuo, arrRem, arrFrac, arrPdt, arrFrac2){
    //variables declared
    let lengthQuo = arrQuo.length; //stores size of quotients array
    let lengthFrac = arrPdt.length; //stores size of fractions array
    let text = ""; //stores the full process in string
    
    // output for integral part
    if(lengthQuo > 0){
        text += base + " |_" + parts[0] +"_| "+arrRem[0]+"\n";
        for(let i=1; i<lengthQuo; i++){
            text += base + " |_" + arrQuo[i-1]+"_| "+arrRem[i]+"\n";
        }
        if(base > 9) text += "     0\n";
        else text += "    0\n";
    }

    // output for fractional part
    if(lengthFrac > 0){
        text += "\n";
        for (let i = 0; i < lengthFrac; i++){
            text += arrFrac[i]+" * "+base+" = "+arrFrac2[i]+" | "+arrPdt[i]+"\n";
        }
    }

    text += "\n";

    // console.log(text);
    document.getElementById("process").innerHTML = text;
}


//[FUNCTION TO CONVERT FROM OTHER TO DECIMAL]
function otherToDecimal(num, base, flag){ //num is string
    //variables and array declared
    let parts = []; //stores 2 parts of i/p
    let dig = []; //stores extracted digits of integer part
    let digF = []; //stores extracted digits of fractional part
    let pdt = []; //stores the digit*base,power integer part
    let pdtF = []; //stores the digit*base,power fractional part
    let whole; //stores integer part of i/p
    let frac; //stores fractional part of i/p
    let pos = num.indexOf("."); //stores position of decimal point (if present), otherwise -1
    let len = num.slice(pos+1).length; //stores length of fractional part
    let extract; //stores extracted elements from i/p
    let digit; //stores calculated digit from extract
    let result = 0; //stores final result
    let power = 0; //stores calculation to be raised to what
    let l; //stores last index of integer part
    
    if(pos != -1){ //fractional part present
        frac = num.slice(pos+1); // frac = parseFloat(num.slice(pos));
        whole = num.slice(0,pos);
    }
    else{ //fractional part absent
        whole = num;
        frac = "";
    }
    parts[0] = whole;
    parts[1] =  frac;
    l = whole.length-1;
    
    //integer part
    while(l >= 0){
        extract = whole.charAt(l);
        if(isNaN(extract)) digit = extract.charCodeAt(0)-55;
        else digit = parseInt(extract);
        dig[power] = digit;
        pdt[power] = digit*Math.pow(base, power);
        result = result + digit*Math.pow(base, power);
        whole = whole.slice(0,l);
        l--;
        power++;
    }
    
    //fractional part
    power = 1;
    if(frac.length != 0){
        while(power <= len){
            extract = frac.charAt(0); // digit = parseInt(frac*10);
            if(isNaN(extract)) digit = extract.charCodeAt(0)-55;
            else digit = parseInt(extract);
            digF[power-1] = digit;
            pdtF[power-1] = (digit/Math.pow(base,power)).toFixed(power);
            result = result + digit/Math.pow(base,power);
            power++;
            frac = frac.slice(1); // frac = (frac*10 - digit).toFixed(power);
        }
    }

    if(flag == 1) displayOtherToDecimal(parts, base, dig, pdt, digF, pdtF); //if process for o/p needed

    return result;
}


//[FUNCTION TO PRINT PROCESS FOR CONVERTING NUMBER FROM OTHER BASE TO DECIMAL]
function displayOtherToDecimal(parts, base, dig, pdt, digF, pdtF){
    //variables declared
    let len = dig.length; //stores size of array of digits of integer part
    let len2 = digF.length; //stores size of array of digits of fractional part
    let text = ""; //stores the full process in string

    for(let i = len-1; i>-1; i--){
        text += dig[i]+"\t|\t";
    }
    if(len2>0){
        for(let i = 0; i<len2; i++){
            text += digF[i]+"\t|\t";
        }
    }
    text += "\n";
    for(let i = len-1; i>-1; i--){
        text += dig[i]+"*"+base+"^"+i+"\t|\t";
    }
    if(len2>0){
        for(let i = 0; i<len2; i++){
            text += digF[i]+"*"+base+"^-"+(i+1)+"\t|\t";
        }
    }
    text += "\n";
    for(let i = len-1; i>-1; i--){
        text += pdt[i]+"\t|\t";
    }
    if(len2>0){
        for(let i = 0; i<len2; i++){
            text += pdtF[i]+"\t|\t";
        }
    }
    text += "\n\n";
    for(let i = len-1; i>-1; i--){
        if (i == 0) text += pdt[i];
        else text += pdt[i]+" + ";
    }
    if(len2>0){
        text += " + ";
        for(let i = 0; i<len2; i++){
            if (i == len2-1) text += pdtF[i];
            else text += pdtF[i]+" + ";
        }
    }
    text += "\n\n";

    // console.log(text);
    document.getElementById("process").innerHTML = text;
}


//[FUNCTION TO CONVERT FROM OTHER TO BINARY]
    //FUNCTION TO CONVERT SINGLE DIGIT TO BINARY
function otherToBinary(num, base){
    //variables declared
    let res = otherToDecimal(num, base, 0);  //stores intermediate result
    let result = decimalToOther(res, 2, 0);  //stores final result
    let len2 = Math.log2(base); //stores size of required bit group
    let len = result.length; //stores size of calculated bit group

    //to format the group if bit grouping is incomplete
    while(len < len2){
        result = "0" + result;
        len++;
    }

    return result;
}

//[FUNCTION TO CONVERT FROM OTHER TO BINARY]
    //FUNCTION TO CONVERT FULL NUMBER FROM OTHER BASE TO BINARY
function otherToBinary2(num, base, flag){
    //variables and array declared
    let grp = []; //stores the converted bit groups of integer part
    let dig = []; //stores the digits of integer part
    let digF = []; //stores the digits of fractional part
    let grpF = []; //stores the converted bit groups of fractional part
    let whole; //stores integer part of i/p
    let frac; //stores fractional part of i/p
    let pos = num.indexOf("."); //stores position of decimal point (if present), otherwise -1
    let len = num.slice(pos+1).length; //stores length of fractional part
    let l; //stores last index of integer part
    let digit; //stores digits of i/p
    let result = ""; //stores final result
    let flg; //for eliminating extra 0's from result

    if(pos != -1){ //fractional part present
        frac = frac = num.slice(pos+1);;
        whole = num.slice(0,pos);
    }
    else{ //fractional part absent
        whole = num;
        frac = "";
    }

    //integer part
    pos = 0;
    l = whole.length-1
    while(l >= 0){
        digit = whole.charAt(l);
        dig[pos] = digit;
        grp[pos] = otherToBinary(digit,base);
        result = otherToBinary(digit,base) + result;
        whole = whole.slice(0,l);
        l--;
        pos++;
    }
    //eliminate extra 0's from integer result
    flg = 0;
    for(let i=0; i<result.length; i++){
        if(result.charAt(i) == '1'){
            flg = 1;
            pos = i;
            break;
        }
    }
    if(flg == 1) result = result.slice(pos);
    else result = "0";

    //fractional part
    pos = 1;
    if(frac.length != 0){
        result = result + ".";
        while(pos <= len){
            digit = frac.charAt(0);
            digF[pos-1] = digit;
            res = otherToBinary(digit, base);
            grpF[pos-1] = res;
            result = result + res;
            frac = frac.slice(1);
            pos++;
        }
        //eliminate extra 0's from fractional result
        flg = 0;
        for(let i=result.length-1; i>result.indexOf("."); i--){
            if(result.charAt(i) == '1'){
                pos = i;
                flg = 1;
                break;
            }
        }
        if(flg == 1) result = result.slice(0, pos+1);
        else result = result.slice(0, result.indexOf(".")+1) + "0";
    }

    if(flag == 1) displayOtherToBinary(dig, grp, digF, grpF); //if process for o/p needed

    return result;
}


//[FUNCTION TO PRINT PROCESS FOR CONVERSION FROM OTHER BASE TO BINARY]
function displayOtherToBinary(dig, grp, digF, grpF){
    //variables declared
    let len = dig.length; //stores size of integral digits array
    let len2 = digF.length; //stores size of fractional digits array
    let text = ""; //stores the full process in string

    for(let i = len-1; i>-1; i--){
        text += dig[i] + "\t|\t";
    }
    for(let i = 0; i<len2; i++){
        text += digF[i] + "\t|\t";
    }
    text += "\n";
    for(let i = len-1; i>-1; i--){
        text += grp[i] + "\t|\t";
    }
    for(let i = 0; i<len2; i++){
        text += grpF[i] + "\t|\t";
    }
    text += "\n\n";

    // console.log(text);
    document.getElementById("process").innerHTML = text;
}


//[FUNCTION TO CONVERT FROM BINARY TO OTHER]
    //FUNCTION TO CONVERT A SINGLE DIGIT
function binaryToOther(num, base){
    //variables declared
    let res = String(otherToDecimal(num, 2, 0)); //stores intermediate result
    let result = decimalToOther(res, base, 0); //stores final result
    return result;
}

//[FUNCTION TO CONVERT FROM BINARY TO OTHER]
    //FUNCTION TO GROUP THE BITS AND CALL FUNCTION FOR CONVERTING
function binaryToOther2(num, base, flag){
    //variables and array declared
    let parts = []; //stores i/p in 2 parts
    let grp = []; //stores bit groups
    let conv = []; //stores converted numbers
    let whole; //stores integer part of i/p
    let frac; //stores fractional part of i/p
    let result = ""; //store final result
    let len = Math.log2(base); //stores bit group size
    let pos = num.indexOf("."); //stores position of decimal point (if present), otherwise -1
    let lenW; //stores length of integer part
    let lenF; //stores length of fractional part
    let x; //stores index for making substring of i/p

    if(pos == -1){
        whole = num;
        frac = "";
    }
    else{
        whole = num.slice(0,pos);
        frac = num.slice(pos+1);
    }
    parts[0] = whole;
    parts[1] = frac;

    //for grouping of bits in proper format according to base
    lenW = whole.length;
    while(lenW%len != 0){
        whole = "0" + whole;
        lenW++;
    }
    lenF = frac.length;
    while(lenF>0 && lenF%len != 0){
        frac = frac + "0";
        lenF++;
    }

    //integer part
    lenW = whole.length;
    pos = 0;
    x = 0;
    while(x < lenW){
        extract = whole.slice(x, x+Math.log2(base));
        grp[pos] = extract;
        conv[pos] = binaryToOther(extract, base);
        result = result + conv[pos];
        x = x + Math.log2(base);
        pos++;
    }

    //fractional part
    lenF = frac.length;
    x = 0;
    if(lenF > 0){
        result = result + ".";
        while(x < lenF){
            extract = frac.slice(x, x+Math.log2(base));
            grp[pos] = extract;
            conv[pos] = binaryToOther(extract, base);
            result = result + conv[pos];
            x = x + Math.log2(base);
            pos++;
        }
    }

    if(flag == 1) displayBinaryToOther(grp, conv); //if process for o/p needed

    return result;
}

//[FUNCTION TO PRINT PROCESS FOR CONVERSION FROM BINARY TO OTHER BASE]
function displayBinaryToOther(grp, conv){
    //variables declared
    let text = ""; //stores the full process in string
    let len = grp.length; //stores size of o/p array

    for(let i=0; i<len; i++){
        text = text + grp[i] + "\t|\t";
    }
    text += "\n";
    for(let i=0; i<len; i++){
        text = text + conv[i] + "\t|\t";
    }
    text += "\n\n";

    // console.log(text);
    document.getElementById("process").innerHTML = text;
}


//[FUNCTION TO CONVERT FROM OCTAL TO HEXADECIMAL]
// function octalToHexadecimal(num, base1, base2){
//     let res = otherToBinary2(num, base1, 1); //octal to binary
//     let result = binaryToOther2(res, base2, 1); //binary to hexadecimal
//     return result;
// }


//[FUNCTION TO CONVERT FROM HEXADECIMAL TO OCTAL]
// function hexadecimalToOctal(num, base1, base2){
//     let res = otherToBinary2(num, base1, 1); //hexadecimal to binary
//     let result = binaryToOther2(res, base2, 1); //binary to octal
//     return result;
// }


//[WILL CALL OTHER FUNCTIONS AND PASS VALUES]
function main2(num, base1, base2){ //base1 is base of given number and base2 is base of resultant number
    let nature = "";
    let result = "";
    if(num.charAt(0) == "-"){ //for -ve i/p
        nature = "-";
        num = num.substring(1);
    }

    if(base1 ==  10) result = decimalToOther(num, base2, 1);
    
    else if(base2 == 10) result = otherToDecimal(num, base1, 1);
    
    else if(base1 == 2 && base2 != 10) result = binaryToOther2(num, base2, 1);
    
    else if(base1 != 10 && base2 == 2) result = otherToBinary2(num, base1, 1);
    
    else if(base1 == 8 && base2 == 16) result = binaryToOther2(otherToBinary2(num, base1, 1), base2, 1);
    
    else if(base1 == 16 && base2 == 8) result = binaryToOther2(otherToBinary2(num, base1, 1), base2, 1);
    
    // console.log(nature+result);
    return nature+result;
}

function myFunction() {
    document.getElementById("frm").reset();
  }

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}


//[CALLED WHEN WEBPAGE IS EXECUTED]
function main(){
    //user i/p from HTML
    var num = document.getElementById('input-text').value;
    var base1 = document.getElementById('select1').value;
    var base2 = document.getElementById('select2').value;
    num = num.toUpperCase();
    
    switch(base1){
        case 'Binary':
            base1 = 2;
            break;
        case 'Decimal':
            base1 = 10;
            break;
        case 'Octal':
            base1 = 8;
            break;
        case 'Hexa-Decimal':
            base1 = 16;
            break;
        default:
            alert("GIVE PROPER BASE OF ENTERED NUMBER!");
            break;
    }
    
    switch(base2){
        case 'Binary':
            base2 = 2;
            break;
        case 'Decimal':
            base2 = 10;
            break;
        case 'Octal':
            base2 = 8;
            break;
        case 'Hexa-Decimal':
            base2 = 16;
            break;
        default:
            alert("GIVE PROPER BASE FOR RESULTANT NUMBER!");
            break;
    }
    
    document.getElementById('result').value = main2(num, base1, base2); //o/p to HTML
}


//[TEST CASES]:

//decimal to other all done
// main2("7.25",10,2);
// main2("-7.5",10,2);
// main2("684",10,16);
// main2("100",10,16);
// main2("100",10,8);
// main2("100-",10,2);
// main2("83.125",10,6);
// main2("7",10,8);
// main2("15",10,16);
// main2("12.55", 10, 2);
// main2("0.9375", 10, 16);

//other to decimal all done
// main2("11.11",2,10);
// main2("0.8",16,10);
// main2("2AC",16,10);
// main2("2AC.F", 16, 10);
// main2("64",16,10);
// main2("144",8,10);
// main2("1100100",2,10);
// main2("215.043",6,10);
// main2("A",16,10);
// main2("1111",2,10);

//other to binary
// main2("75.5",8,2);
// main2("75",16,2);
// main2("2AC.4F6",16,2);
// main2("F",16,2);
// main2("0.A", 16, 2);
// main2("AF.FA", 16, 2);
// main2("15.15", 16, 2);
// main2("10.15", 16, 2);
// main2("10.10", 16, 2);
// main2("10.AE", 16, 2);
// main2("1.15",16,2);
// main2("15", 16, 2);
// main2("7",8,2);

//binary to other
// main2("111", 2, 8);
// main2("111", 2, 16);
// main2("1111", 2, 8);
// main2("1111", 2, 16);
// main2("0.111", 2, 8);
// main2("0.111", 2, 16);
// main2("0.1111", 2, 8);
// main2("0.1111", 2, 16);
// main2("111.111",2,8);
// main2("111.111",2,16);
// main2("1111.1111",2,8);
// main2("1111.1111",2,16);
// main2("1111",2,8);
// main2("11111111",2,8);
// main2("11111111",2,16);

//other to other
// main2("377",8,16);
// main2("FF",16,8);