const text = "DevSecOps is an augmentation of DevOps to allow for security practices to be integrated into the DevOps approach. Contrary to a traditional centralized security team model, each delivery team is empowered to factor in the correct security controls into their software delivery. Security practices and testing are performed earlier in the development lifecycle, hence the term \"shift left\". Security is tested in three main areas: static, software composition, and dynamic.";

const textarr = text.split(' ');
for(i=0;i<textarr.length;i++){
    textarr[i]=textarr[i]+' ';
}

console.log(textarr);
    