
class Image {
  static getImageBranch =(branch)=>{
    if(branch == 'Uruapan' || branch =='Uruapan 1'|| branch =='Uruapan 2'){
      return '../../public/uruapan.jpg'
    }else if(branch == 'Tinguindin'){
      return '../../public/tin.jpg'
    }else if(branch == 'Patzcuaro Libertad' || branch == 'Patzcuaro Federico Tenia' || branch == 'Patzcuaro'){
      return '../../public/patzcuaro.jpg'
    }else if(branch == 'Ario de Rosales'){
      return '../../public/AriodeRosales.jpg'
    }else if(branch == 'Morelia'){
      return '../../public/morelia.jpg'
    }else if(branch == 'Salvador Escalante'){
      return '../../public/salvadorEscalante.jfif'
    }
  }

  static getImageCompany = (company) =>{
    if(company == 'Cortes.com' ){
      return '../../public/cortescom.png'
    }else if(company == 'AVO B&B'){
      return '../../public/avoBB.png'
    }else if(company == 'CLOSSET'){
      return '../../public/CLOSSET.PNG'
    }else if(company == 'LIVERPACAS'){
      return '../../public/Liverpacas.PNG'
    }else if(company == 'Galaxsys'){
      return '../../public/GalaxSys.png'
    } else if(company == 'Catalogo Alexa'){
      return '../../public/alexa.png'
    }
  }
}


export default Image
