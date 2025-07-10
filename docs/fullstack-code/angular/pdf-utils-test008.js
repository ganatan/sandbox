const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

const PDF_TOP = 40;
const PDF_BOTTOM = 40;
const PDF_LEFT = 30;
const PDF_RIGHT = 30;
const PDF_WIDTH = 1;

const SIZE_DOWN_BR = 1;

const INTRO_TOP = 40;
const INTRO_BOTTOM = 40;
const INTRO_LEFT = 40;
const INTRO_RIGHT = 30;
const INTRO_WIDTH = 0.56;

const ITEM_TOP = 40;
const ITEM_BOTTOM = 40;
const ITEM_LEFT = 50;
const ITEM_RIGHT = 30;
const ITEM_WIDTH = 0.80;

function writeText(doc, textLeft, textWidth, textSize, textColor, text) {
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
      writeTextP(doc, textLeft, textWidth, textSize, textColor, match[1]);
    } else if (match[2]) {
      doc.font('ARIAL').moveDown(1);
    } else if (match[3]) {
      writeTextUl(doc, textLeft, textWidth, textSize, textColor, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(afterMatch,
        textLeft, doc.y, { width: textWidth, });
  }
}

function writeTextP(doc, textLeft, textWidth, textSize, textColor, text) {
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

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(beforeMatch,
            textLeft, doc.y, { width: textWidth, });
      } else {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(beforeMatch,
            textLeft, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(1);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(textSize).fillColor(textColor)
        .text(match[2],
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(textSize).fillColor(textColor)
        .text(match[3],
          textLeft, doc.y, { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(afterMatch,
        textLeft, doc.y, { width: textWidth, });
  }
}

function writeTextUl(doc, textLeft, textWidth, textSize, textColor, text) {
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
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<li>(.*?)<\/li>/g;
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
      writeTextLi(doc, textLeft, textWidth, textSize, textColor, match[4]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextLi(doc, textLeft, textWidth, textSize, textColor, text) {
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
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>/g;
  let lastIndex = 0;
  let match;
  let index = 0;
  let bulletLi = '';

  while ((match = regex.exec(text)) !== null) {
    bulletLi = ' ';
    if (index === 0) {
      bulletLi = bullet;
    }
    console.log('00000000000:' + match);
    console.log('00000000001:' + match[1]);
    console.log('00000000002:' + match[2]);
    console.log('00000000003:' + match[3]);
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    console.log('00000000004:' + beforeMatch);
    if (beforeMatch) {
      console.log('00000000005:' + match[1]);
      if (match[1]) {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(`${bulletLi} ${beforeMatch}`,
            textLeft, doc.y, { width: textWidth, });
      } else {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(`${bulletLi} ${beforeMatch}`,
            textLeft, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      index += 1;
      doc.font('ARIAL').moveDown(0.1);
    } else if (match[2]) {
      index += 1;
      doc.font('ARIALBD').fontSize(textSize).fillColor(textColor)
        .text(`${bulletLi} ${match[2]}`,
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      index += 1;
      doc.font('ARIALI').fontSize(textSize).fillColor(textColor)
        .text(`${bulletLi} ${match[3]}`,
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    }
    lastIndex = regex.lastIndex;

  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(`${bulletLi} ${afterMatch}`,
        textLeft, doc.y, { width: textWidth });
  }
}

function sanitize(content) {
  return content.replace(/&nbsp;/g, ' ');
}

function addImageWithShadow(active, doc, imagePath, posX, posY, scaleFactor = 0.6, shadowOffset = 5) {
  if (!fs.existsSync(imagePath)) {
    console.error(`Image not found: ${imagePath}`);
    return;
  }
  const image = doc.openImage(imagePath);
  const newWidth = image.width * scaleFactor;
  const newHeight = image.height * scaleFactor;
  doc.image(imagePath, posX, posY, { width: newWidth, height: newHeight });
  if (active) {
    doc.rect(posX + 1, posY + 1, newWidth, newHeight)
      .strokeColor('#cccccc')
      .lineWidth(1)
      .stroke();
    doc.rect(posX, posY, newWidth, newHeight)
      .strokeColor('#ffffff')
      .lineWidth(2)
      .stroke();
  }
}

function addWhiteLine(doc, posY, thickness = 1) {
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  const lineWidth = (pageWidth - pageMargins) * 1;
  const startX = (pageWidth - lineWidth) / 2;
  const endX = startX + lineWidth;
  doc.moveTo(startX, posY)
    .lineTo(endX, posY)
    .strokeColor('#ffffff')
    .lineWidth(thickness)
    .stroke();
}


function generatePDFOld(data, outputPath, callback) {
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
  let releaseDate = data.releaseDate;

  let text = 'Demarrer avec Angular CLI';

  // doc.font('ARIAL').fontSize(14).fillColor('black').text(text);
  // doc.moveDown(1);
  // doc.font('ARIAL').fontSize(14).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
  // doc.font('ARIAL').fontSize(14).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
  // doc.font('ARIAL').fontSize(14).fillColor('black').text(text);
  // doc.moveDown(1);


  // const htmlText = "Le site officiel c'est ici <a href=\"https://nodejs.org/en\">https://nodejs.org/en</a>";
  // const regex = /(.*)<a href="([^"]*)">([^<]*)<\/a>(.*)/;
  // const match = htmlText.match(regex);
  // if (match) {
  //   const beforeLink = match[1];
  //   const href = match[2];
  //   const linkText = match[3];
  //   const afterLink = match[4];

  //   doc.font('ARIAL').fontSize(14).fillColor('black').text(beforeLink, { continued: true });
  //   doc.font('ARIAL').fontSize(14).fillColor('blue').text(linkText, { link: href, underline: true, continued: true });
  //   doc.font('ARIAL').fontSize(14).fillColor('black').text(afterLink);
  // } else {
  //   doc.font('ARIAL').fontSize(14).fillColor('black').text(htmlText);
  // }
  // doc.moveDown(1);



  let stepNumber = 0;
  data.elements.forEach((element, index) => {
    let typeimage = element.typeimage;
    let nameimage = element.nameimage;
    let chapternameimage = element.chapternameimage;
    let typetext = element.typetext;
    let content = sanitize(element.content);
    let typeintro = element.typeintro;
    let typecode = element.typecode;
    let typechapter = element.typechapter;
    let typesignup = element.typesignup;
    let linkable = element.linkable;
    let title = element.title;
    let textColorTitle = 'white';
    let textColor = 'black';
    let size = 14;
    let sizedown = 0.2;
    let sizedownTitle = 0.4;

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const pageMargins = doc.page.margins.left + doc.page.margins.right;

    // let textPrdWidth = pageWidth - pageMargins;
    // let textItemWidth = (pageWidth - pageMargins) * ITEM_WIDTH;
    // let textIntroWidth = (pageWidth - pageMargins) * INTRO_WIDTH;

    if (typetext) {

      // if (typeintro) {

      //   let textWidthIntro = 500;
      //   let titleWidthIntro = 500;
      //   let xPos = 0;

      //   let nameimageBanner = 'introduction-banner.png';
      //   let imagePathBanner = pathImages + nameimageBanner;
      //   const imageBanner = doc.openImage(imagePathBanner);
      //   let imgWidthBanner = imageBanner.width;
      //   let imgHeightBanner = imageBanner.height;
      //   let scaleFactorBanner = 0.75;
      //   let newWidthBanner = imgWidthBanner * scaleFactorBanner;
      //   let newHeightBanner = imgHeightBanner * scaleFactorBanner;

      //   let centerX = (pageWidth - newWidthBanner) / 2;
      //   let posY = 18;
      //   doc.image(imagePathBanner, centerX, posY, {
      //     width: newWidthBanner,
      //     height: newHeightBanner,
      //   });

      //   let nameimageIntro = 'introduction-background.png';
      //   let imagePathIntro = pathImages + nameimageIntro;
      //   doc.image(imagePathIntro, 0, 60, {
      //     width: pageWidth,
      //     height: pageHeight,
      //   });

      //   const nameImageTutorial = 'tutorial.png';
      //   const imagePathTutorial = path.join(pathImages, nameImageTutorial);
      //   addImageWithShadow(true, doc, imagePathTutorial, 350, 380);

      //   doc.y += 65;
      //   introColor = 'white';
      //   xPos = (pageWidth - titleWidthIntro) / 2;
      //   doc.font('ARIALBD').fontSize(34).fillColor(introColor)
      //     .text(title,
      //       xPos, doc.y, {
      //       width: titleWidthIntro,
      //       align: 'center'
      //     });

      //   doc.y += 40;
      //   textColorTitle = 'grey';
      //   let guideTitle = 'Guide Complet';
      //   xPos = (pageWidth - textWidthIntro) / 2;
      //   doc.font('ARIALBD').fontSize(26).fillColor('#D9D9D9').text(guideTitle,
      //     xPos, doc.y, {
      //     width: textWidthIntro,
      //     align: 'center'
      //   });

      //   const linePosY = doc.y + 45;
      //   addWhiteLine(doc, linePosY);

      //   doc.y += 60;
      //   textColorTitle = 'white';
      //   doc.font('ARIALBD').fontSize(12).fillColor(textColorTitle).text(releaseDate,
      //     xPos, doc.y, {
      //     width: textWidthIntro,
      //     align: 'right'
      //   });

      //   let textColorIntro = 'white';
      //   doc.y += 30;
      //   let textSizeIntro = 18;
      //   writeText(doc, ITEM_LEFT, 280, textSizeIntro, textColorIntro, content);

      //   doc.addPage({
      //     size: 'A4', margins: {
      //       top: PDF_TOP,
      //       bottom: PDF_BOTTOM,
      //       left: PDF_LEFT,
      //       right: PDF_RIGHT,
      //     }
      //   });

      // }

      // if (typechapter) {

      //   let nameimageIntro = 'introduction-background.png';
      //   let imagePathIntro = pathImages + nameimageIntro;
      //   doc.image(imagePathIntro, 0, 0, {
      //     width: pageWidth,
      //     height: pageHeight,
      //   });
      //   stepNumber = stepNumber + 1;
      //   textColorTitle = 'white';
      //   doc.font('ARIALBD').fontSize(34).fillColor(textColorTitle).text('Etape ' + stepNumber, 50, 150, {
      //     width: textWidthItem,
      //     align: 'center'
      //   });

      //   const nameImageChapter = chapternameimage;
      //   const imagePathChapter = path.join(pathImages, nameImageChapter);
      //   addImageWithShadow(false, doc, imagePathChapter, 350, 380);

      //   textColor = 'white';
      //   doc.y += 0;
      //   let sizeIntro = 18;
      //   writeText(ITEM_LEFT, textColor, textWidthIntro, sizeIntro, sizedown, doc, content);
      //   doc.addPage({
      //     size: 'A4', margins: {
      //       top: PDF_TOP,
      //       bottom: PDF_BOTTOM,
      //       left: PDF_LEFT,
      //       right: PDF_RIGHT,
      //     }
      //   });
      // }

      if (!typeintro && !typechapter && !typeimage && !typecode && !typesignup) {

        if (linkable) {

          // doc.font('ARIALBD')
          //   .fontSize(24)
          //   .fillColor('black')
          //   .text('Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title',
          //     xPosition, doc.y, {
          //     width: 500,
          //     align: 'center'
          //   });
          // doc.font('ARIAL').moveDown(1);

          // doc.font('ARIAL')
          //   .fontSize(24)
          //   .fillColor('black')
          //   .text('Intro Data Intro Data Intro Data',
          //     30, doc.y, {
          //     width: 200,
          //     align: 'left'
          //   });

          // const nameImageTutorial = 'tutorial.png';
          // const imagePathTutorial = path.join(pathImages, nameImageTutorial);
          // addImageWithShadow(true, doc, imagePathTutorial, 350, 380);
          // addImageWithShadow(true, doc, imagePathTutorial, 350, 80);

          // doc.addPage({
          //   size: 'A4', margins: {
          //     top: PDF_TOP,
          //     bottom: PDF_BOTTOM,
          //     left: PDF_LEFT,
          //     right: PDF_RIGHT,
          //   }
          // });

          // doc.font('ARIALBD')
          //   .fontSize(24)
          //   .fillColor('black')
          //   .text('Item Title Item Title Item Title Item Title Item Title Item Title Item Title',
          //     xPosition, doc.y, {
          //     width: 500,
          //     align: 'center'
          //   });
          // doc.font('ARIAL').moveDown(1);

          // doc.font('ARIAL')
          //   .fontSize(24)
          //   .fillColor('black')
          //   .text('Item Data Item Data Item Data Item Data Item Data',
          //     30, doc.y, {
          //     width: 400,
          //     align: 'left'
          //   });

          // const pageWidth = doc.page.width;


          let sizeDownBrFirst = 0.2;
          let sizeDownBrSecond = 0.6;
          let textWith = 500;

          let titleSize = 24;
          let titleWidth = 500;
          let titleColor = '#2196f3';
          const xPos = (pageWidth - titleWidth) / 2;

          doc.font('ARIALBD')
            .fontSize(titleSize)
            .fillColor(titleColor)
            .text(`Démarrer une Application Web avec Angular CLI 19`,
              xPos, doc.y, {
              width: titleWidth,
              align: 'left'
            });


          doc.font('ARIALBD')
            .fontSize(14)
            .fillColor('black')
            .text(`Si vous ne l'installez pas, Angular ne fonctionnera pas.`,
              30, doc.y, {
              width: textWith,
              align: 'left'
            });

          doc.font('ARIAL').moveDown(sizeDownBrFirst);
          doc.font('ARIAL').moveDown(sizeDownBrSecond);

          doc.font('ARIAL')
            .fontSize(14)
            .fillColor('black')
            .text(`A ce propos Angular, React et Vuejs ont besoin tous trois de Node.js.`,
              30, doc.y, {
              width: textWith,
              align: 'left'
            });

          doc.font('ARIAL').moveDown(sizeDownBrFirst);
          doc.font('ARIAL').moveDown(sizeDownBrSecond);

          // doc.font('ARIAL')
          // .fontSize(14)
          // .fillColor('black')
          // .text(`Le site officiel c'est ici https://nodejs.org/en`,
          //   30, doc.y, {
          //   width: 500,
          //   align: 'left'
          // });

          doc.font('ARIAL')
            .fontSize(14)
            .fillColor('black')
            .text(`Le site officiel c'est ici `, 30, doc.y, {
              width: textWith,
              align: 'left',
              continued: true
            })
            .fillColor('#2196f3')
            .text('https://nodejs.org/en', {
              link: 'https://nodejs.org/en',
              underline: true
            });


          // doc.font('ARIAL').moveDown(1);

          // let titleSize = 24;
          // let titleWidth = 500;
          // let titleColor = '#2196f3';
          // const xPos = (pageWidth - titleWidth) / 2;
          // doc.font('ARIALBD')
          //   .fontSize(titleSize)
          //   .fillColor(titleColor)
          //   .text(title,
          //     xPos, doc.y, {
          //     width: titleWidth,
          //     align: 'center'
          //   });
          // doc.font('ARIAL').moveDown(1);

          // let textLeft = 50;
          // let textWidth = 500;
          // let textSize = 14;
          // let textColor = 'black';
          // let text = content;
          // writeText(doc, textLeft, textWidth, textSize, textColor, text);



        }

        // if (!linkable) {
        //   textColor = 'black';
        //   writeText(ITEM_LEFT, textColor, textWidthItem, size, sizedown, doc, content);
        // }


      }

    }

    // if (typecode) {
    //   doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('aaaa', PDF_LEFT, doc.y);
    //   textColor = 'black';
    //   writeText(ITEM_LEFT, textColor, textWidthItem, size, sizedown, doc, content);
    // }


    if (typeimage) {
      let imagePath = pathImages + nameimage;
      const image = doc.openImage(imagePath);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      let imgWidth = image.width;
      let imgHeight = image.height;
      const scaleFactor = 0.75;
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;
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

      doc.font('ARIALBD').fontSize(24).fillColor(('black')).text('avant image', PDF_LEFT, doc.y);
      doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
        width: imgWidth,
        height: imgHeight
      });
      doc.y += imgHeight + 10;
      doc.font('ARIALBD').fontSize(24).fillColor(('black')).text('apres image', PDF_LEFT, doc.y);

    }

  })

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}

module.exports = {
  generatePDF,
};

