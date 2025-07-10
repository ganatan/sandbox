const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

const PDF_TOP = 40;
const PDF_BOTTOM = 40;
const PDF_LEFT = 40;
const PDF_RIGHT = 40;

function writeText(textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }

  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(textColor, textWidth, size, sizedown, doc, match[1]);
    } else if (match[2]) {
      doc.font('ARIAL').moveDown(sizedown);
    } else if (match[3]) {
      writeTextUl(textColor, textWidth, size, sizedown, doc, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor(textColor).text(afterMatch, { width: textWidth });
  }
}

function writeTextP(textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(beforeMatch, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(beforeMatch, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(sizedown);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor(textColor).text(match[2], { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor(textColor).text(match[3], { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor(textColor).text(afterMatch, { width: textWidth });
    doc.font('ARIAL').moveDown(sizedown);
  }
}

function writeTextUl(textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>|<li>(.*?)<\/li>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {

    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
    } else if (match[2]) {
    } else if (match[3]) {
    } else if (match[4]) {
      writeTextLi(textColor, textWidth, size, sizedown, doc, match[4]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextLi(textColor, textWidth, size, sizedown, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(`${beforeMatch}`, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(`${bullet} ${beforeMatch}`, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.moveDown(sizedown);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor(textColor).text(match[2], { width: textWidth, continued: true });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor(textColor).text(match[3], { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function sanitize(content) {
  return content.replace(/&nbsp;/g, ' ');
}

function addImageWithShadow(doc, imagePath, posX, posY, scaleFactor = 0.6, shadowOffset = 5) {
  if (!fs.existsSync(imagePath)) {
    console.error(`Image not found: ${imagePath}`);
    return;
  }
  const image = doc.openImage(imagePath);
  const newWidth = image.width * scaleFactor;
  const newHeight = image.height * scaleFactor;
  doc.image(imagePath, posX, posY, { width: newWidth, height: newHeight });
  doc.rect(posX + 1, posY + 1, newWidth, newHeight)
    .strokeColor('#cccccc')
    .lineWidth(1)
    .stroke();
  doc.rect(posX, posY, newWidth, newHeight)
    .strokeColor('#ffffff')
    .lineWidth(2)
    .stroke();
}

function addWhiteLine(doc, posY, thickness = 1) {
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  const lineWidth = (pageWidth - pageMargins) * 0.8;
  const startX = (pageWidth - lineWidth) / 2;
  const endX = startX + lineWidth;
  doc.moveTo(startX, posY)
    .lineTo(endX, posY)
    .strokeColor('#ffffff')
    .lineWidth(thickness)
    .stroke();
}

function generatePDF(data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  const doc = new PDFDocument({
    autoFirstPage: false,
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.registerFont('ARIAL', ARIAL);
  doc.registerFont('ARIALBD', ARIALBD);
  doc.registerFont('ARIALBI', ARIALBI);
  doc.registerFont('ARIALI', ARIALI);

  doc.addPage({
    size: 'A4', margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });

  let pathImages = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/';

  data.elements.forEach((element, index) => {
    let typeimage = element.typeimage;
    let nameimage = element.nameimage;
    let typetext = element.typetext;
    let content = sanitize(element.content);
    let typeintro = element.typeintro;
    let typechapter = element.typechapter;
    let title = element.title;
    let textColorTitle = 'white';
    let textColor = 'black';
    let size = 14;
    let sizedown = 0.2;
    let text = '';

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const pageMargins = doc.page.margins.left + doc.page.margins.right;
    let textWidthFull = pageWidth - pageMargins;
    let textWidthIntro = (pageWidth - pageMargins) * 0.6;

    if (typetext) {
      if (typeintro) {

        let nameimageBanner = 'introduction-banner.png';
        let imagePathBanner = pathImages + nameimageBanner;
        const imageBanner = doc.openImage(imagePathBanner);
        let imgWidthBanner = imageBanner.width;
        let imgHeightBanner = imageBanner.height;
        let scaleFactorBanner = 0.75;
        let newWidthBanner = imgWidthBanner * scaleFactorBanner;
        let newHeightBanner = imgHeightBanner * scaleFactorBanner;

        let centerX = (pageWidth - newWidthBanner) / 2;
        let posY = 15;
        doc.image(imagePathBanner, centerX, posY, {
          width: newWidthBanner,
          height: newHeightBanner,
        });

        let nameimageIntro = 'introduction-background.png';
        let imagePathIntro = pathImages + nameimageIntro;
        const imageIntro = doc.openImage(imagePathIntro);
        doc.image(imagePathIntro, 0, 60, {
          width: pageWidth,
          height: pageHeight,
        });

        const nameImageTutorial = 'tutorial.png';
        const imagePathTutorial = path.join(pathImages, nameImageTutorial);
        addImageWithShadow(doc, imagePathTutorial, 350, 380);

        doc.y += 60;
        textColorTitle = 'white';
        doc.font('ARIALBD').fontSize(34).fillColor(textColorTitle).text(title, {
          width: textWidthFull,
          align: 'center'
        });

        const linePosY = doc.y + 40;
        addWhiteLine(doc, linePosY);

        // doc.font('ARIAL')
        //   .fontSize(20)
        //   .fillColor('white')
        //   .text('aaaa', 200, 200);

        // doc.font('ARIAL')
        //   .fontSize(20)
        //   .fillColor('white')
        //   .text('bbbb', {
        //     width: textWidthFull,
        //   });

        // doc.font('ARIAL')
        //   .fontSize(20)
        //   .fillColor('white')
        //   .text('cccc', 0, 220);

        // Texte "aaaa" positionné manuellement à (200, 200)


        doc.font('ARIAL').fontSize(20).fillColor('white')
          .text('demarrer avec angular demarrer avec angular demarrer avec angular ', 0, doc.y,
            {
              width: textWidthFull
            }
          );
        doc.font('ARIAL').fontSize(20).fillColor('white')
          .text('demarrer avec angular demarrer avec angular demarrer avec angular ', 50, doc.y

            ,
            {
              width: textWidthIntro
            }
          ); doc.font('ARIAL').fontSize(20).fillColor('white')
            .text('demarrer avec angular demarrer avec angular demarrer avec angular ', 0, doc.y
              ,
              {
                width: textWidthFull
              }
            );

        // doc.font('ARIAL').fontSize(20).fillColor('white').text('aaaa');
        // doc.text('bbbb', 300, doc.y);
        // doc.text('cccc');


        // doc.font('ARIAL')
        //   .fontSize(20)
        //   .fillColor('white')
        //   .text('aaaa', 200, 200);
        // doc.moveDown(1);
        // doc.font('ARIAL')
        //   .fontSize(20)
        //   .fillColor('white')
        //   .text('bbbb', 0, 200, {
        //     width: textWidthFull
        //   });



        // let text2 = '19/02/2025';
        // doc.font('ARIAL')
        //   .fontSize(size)
        //   .fillColor('white')
        //   .text(text2, 200, doc.y + 40, {
        //     width: textWidthFull,
        //     align: 'right'
        //   });






        // doc.y += 50;
        // textColorTitle = 'white';
        // doc.font('ARIALBD').fontSize(14).fillColor(textColorTitle).text('19/02/25', 400, doc.y);

        textColor = 'white';
        doc.y += 120;
        let sizeIntro = 16;
        // let textWidthIntro = (pageWidth - pageMargins) * 0.6;
        writeText(textColor, textWidthIntro, sizeIntro, sizedown, doc, content);
        doc.addPage({
          size: 'A4', margins: {
            top: PDF_TOP,
            bottom: PDF_BOTTOM,
            left: PDF_LEFT,
            right: PDF_RIGHT,
          }
        });
      } else {
        textColorTitle = '#2196f3';
        doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text(title, {
          width: textWidthFull,
          align: 'center'
        });
        textColor = 'black';
        writeText(textColor, textWidthFull, size, sizedown, doc, content);
      }
    }
    if (typeimage) {
      let imagePath = pathImages + nameimage;
      const image = doc.openImage(imagePath);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
      let imgWidth = image.width;
      let imgHeight = image.height;
      let availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgHeight > availableHeight) {
        doc.addPage({
          size: 'A4', margins: {
            top: PDF_TOP,
            bottom: PDF_BOTTOM,
            left: PDF_LEFT,
            right: PDF_RIGHT,
          }
        });
      }
      availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgWidth > pageWidth || imgHeight > availableHeight) {
        const scaleFactor = Math.min(pageWidth / imgWidth, availableHeight / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }
      doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
        width: imgWidth,
        height: imgHeight
      });
      doc.y += imgHeight + 10;
    }

  })


  // const pageWidth = doc.page.width;
  // const pageHeight = doc.page.height;
  // const pageMargins = doc.page.margins.left + doc.page.margins.right;
  // console.log('00000000001:' + pageWidth);
  // console.log('00000000001:' + pageHeight);
  // let textWidthFull = pageWidth * 0.6;
  // let text2 = 'Démarrer une Application Web avec Angular Démarrer une Application Web avec Angular Démarrer une Application Web avec Angular';
  // doc.font('ARIAL')
  //   .fontSize(14)
  //   .fillColor('black')
  //   .text(text2, {
  //     width: textWidthFull,
  //     align: 'left'
  //   });

  // doc.font('ARIAL')
  //   .fontSize(14)
  //   .fillColor('black')
  //   .text(text2, {
  //     width: pageWidth,
  //     align: 'left'
  //   });

  //   doc.font('ARIAL')
  //   .fontSize(14)
  //   .fillColor('black')
  //   .text(text2, {
  //     width: textWidthFull,
  //     align: 'left'
  //   });


  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}



// function generatePDF(data, outputPath, callback) {
//   if (!fs.existsSync(path.dirname(outputPath))) {
//     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
//   }

//   // Création du document avec marges minimales
//   const doc = new PDFDocument({
//     autoFirstPage: false,
//     margins: {
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0
//     }
//   });

//   const stream = fs.createWriteStream(outputPath);
//   doc.pipe(stream);

//   doc.registerFont('ARIAL', ARIAL);
//   doc.registerFont('ARIALBD', ARIALBD);
//   doc.registerFont('ARIALBI', ARIALBI);
//   doc.registerFont('ARIALI', ARIALI);
//   doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
//   const pageWidth = doc.page.width;
//   const pageHeight = doc.page.height;
//   console.log('Page width:', pageWidth);
//   console.log('Page height:', pageHeight);
//   let text2 = 'Démarrer une Application Web avec Angular';
//   doc.font('ARIAL')
//     .fontSize(14)
//     .fillColor('black')
//     .text(text2, 0, 0,
//       width: pageWidth,
//       align: 'left'
//     });
//   doc.moveDown(1);
//   doc.end();

//   stream.on('finish', () => {
//     if (callback) callback();
//   });
// }






module.exports = {
  generatePDF,
};

