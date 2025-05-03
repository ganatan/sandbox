const Prism = require('prismjs');
require('prismjs/components/prism-javascript');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const { LANGUAGE_TYPE } = require('../constants/language-constants');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

const PDF_SIZE = 'A4';
const PDF_TOP = 40;
const PDF_BOTTOM = 40;
const PDF_LEFT = 30;
const PDF_RIGHT = 30;

const PDF_WIDTH = 535;

const PDF_INTRO = {
  titleFont: 'ARIALBD',
  titleSize: 24,
  titleWidth: PDF_WIDTH,
  titleLeft: 60,
  titleColor: 'white',
  titleAlign: 'left',
  textFont: 'ARIAL',
  textSize: 15,
  textWidth: 280,
  textLeft: 50,
  textColor: 'white',
  textAlign: 'left',
}

const PDF_CHAPTER = {
  titleFont: 'ARIALBD',
  titleSize: 24,
  titleWidth: PDF_WIDTH,
  titleLeft: 60,
  titleColor: 'white',
  titleAlign: 'left',
  textFont: 'ARIAL',
  textSize: 16,
  textWidth: 280,
  textLeft: 50,
  textColor: 'white',
  textAlign: 'left',
}

const PDF_ITEM = {
  titleFont: 'ARIALBD',
  titleSize: 24,
  titleWidth: 480,
  titleLeft: 60,
  titleColor: '#2196f3',
  titleAlign: 'left',
  textFont: 'ARIAL',
  textSize: 14,
  textWidth: 495,
  textLeft: 50,
  textColor: 'black',
  textAlign: 'left',
}

const PDF_CODE = {
  textWidth: 495,
  textSize: 10,
  textLeft: 70,
}

const PDF_DOWN = {
  sizeBrFirst: 0.2,
  sizeBrSecond: 0.7,
  sizeFont: 'ARIAL',
}

const COLOR_HREF = '#2196f3';
const LINE_GAP = 3;
const BULLET_LI = '• ';
const LEFT_LI = 12;

function sanitize(content) {
  let result = content.replace(/&nbsp;/g, ' ')
  result = result.replace(/&gt;/g, '>');

  return result;
}

function addParagraph(content) {
  if (/^\s*<(p|ul)>/.test(content)) {
    return content;
  }
  return `<p>${content}</p>`;
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

function addLine(color, doc, posY, thickness = 1) {
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  const lineWidth = (pageWidth - pageMargins) * 1;
  const startX = (pageWidth - lineWidth) / 2;
  const endX = startX + lineWidth;
  doc.moveTo(startX, posY)
    .lineTo(endX, posY)
    .strokeColor(color)
    .lineWidth(thickness)
    .stroke();
  if (color !== 'white') {
    doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
    doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
  }

}

function writeTextLi(doc, text, font, color, width, size, left, align) {
  const bullet = BULLET_LI;
  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;

  let lastIndex = 0;
  let beforeContinued = false;
  let match;
  let bulletLi = '';
  let leftLi = 0;
  let textFormat = '';
  let countWrite = 0;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    if (beforeMatch) {
      if (match[1]) {
        countWrite += 1;
        bulletLi = ''; leftLi = LEFT_LI;
        if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
        textFormat = `${bulletLi}${beforeMatch}`;
        doc.font(font)
          .fontSize(size)
          .fillColor(color);
        if (beforeContinued) {
          doc.text(textFormat,
            {
              width: width,
              align: align,
              lineGap: LINE_GAP,
            });
        } else {
          doc.text(textFormat,
            left + leftLi,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
          });
          beforeContinued = false;
        }
      } else {
        countWrite += 1;
        bulletLi = ''; leftLi = LEFT_LI;
        if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
        textFormat = `${bulletLi}${beforeMatch}`;
        doc.font(font)
          .fontSize(size)
          .fillColor(color);
        if (beforeContinued) {
          doc.text(textFormat,
            {
              width: width,
              align: align,
              lineGap: LINE_GAP,
              continued: true,
            });
        } else {
          doc.text(textFormat,
            left + leftLi,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: true,
          });
        }
        beforeContinued = true;
      }
    }
    if (match[1]) {
      beforeContinued = false;
      countWrite += 1;
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrFirst);
      if (match[2]) {
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
      }
    } else if (match[3]) {
      countWrite += 1;
      bulletLi = ''; leftLi = LEFT_LI;
      if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
      textFormat = `${bulletLi}${match[3]}`;
      doc.font('ARIALBD')
        .fontSize(size)
        .fillColor(color);
      if (beforeContinued) {
        doc.text(textFormat,
          {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: !nextMatchBr && !lastMatch
          });
      } else {
        doc.text(textFormat,
          left + leftLi,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      }
      beforeContinued = !nextMatchBr && !lastMatch;
    } else if (match[4]) {
      countWrite += 1;
      bulletLi = ''; leftLi = LEFT_LI;
      if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
      textFormat = `${bulletLi}${match[4]}`;

      doc.font('ARIALI')
        .fontSize(size)
        .fillColor(color);
      if (beforeContinued) {
        doc.text(textFormat,
          {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: !nextMatchBr && !lastMatch
          });
      } else {
        doc.text(textFormat,
          left + leftLi,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      }
      beforeContinued = !nextMatchBr && !lastMatch;
    } else if (match[5]) {
      countWrite += 1;
      bulletLi = ''; leftLi = LEFT_LI;
      if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
      textFormat = `${match[6]}`;
      doc.font(font)
        .fontSize(size)
        .fillColor(color);
      if (!beforeContinued) {
        doc.text(`${bulletLi}`, {
          lineGap: LINE_GAP,
          continued: true,
        });
      } else {
        doc.text(`${bulletLi}`, {
          lineGap: LINE_GAP,
          continued: true,
        });
      }
      doc.font(font)
        .fontSize(size)
        .fillColor(COLOR_HREF);
      if (!beforeContinued) {
        doc.text(textFormat, {
          link: match[5],
          underline: true,
          lineGap: LINE_GAP,
        });
      } else {
        doc.text(textFormat, {
          link: match[5],
          underline: true,
          lineGap: LINE_GAP,
        });
      }
      beforeContinued = false;
    }
    lastIndex = regex.lastIndex;

  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    countWrite += 1;
    bulletLi = ''; leftLi = LEFT_LI;
    if (countWrite === 1) { bulletLi = bullet + ' '; leftLi = 0; }
    textFormat = `${bulletLi}${afterMatch}`;

    doc.font(font)
      .fontSize(size)
      .fillColor(color);
    if (beforeContinued) {
      doc.text(textFormat,
        {
          width: width,
          align: align,
          lineGap: LINE_GAP,
        });
    } else {
      doc.text(textFormat,
        left + leftLi,
        doc.y, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
    }
    beforeContinued = false;
  }

}

function writeTextUl(doc, text, font, color, width, size, left, align) {
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
      writeTextLi(doc, match[4], font, color, width, size, left, align);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextP(doc, text, font, color, width, size, left, align) {

  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    if (beforeMatch) {
      if (match[1]) {
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(beforeMatch,
            left,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
          });
      } else {
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(beforeMatch,
            left,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: true
          });
      }
    }

    if (match[1]) {
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrFirst);
      if (match[2]) {
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
      }
    } else if (match[3]) {
      doc.font('ARIALBD')
        .fontSize(size)
        .fillColor(color)
        .text(match[3],
          left,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
    } else if (match[4]) {
      doc.font('ARIALI')
        .fontSize(size)
        .fillColor(color)
        .text(match[4],
          left,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
    } else if (match[5]) {
      doc.font(font)
        .fontSize(size)
        .fillColor(COLOR_HREF)
        .text(match[6], {
          link: match[5],
          underline: true,
          lineGap: LINE_GAP,
        });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch,
        left,
        doc.y, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function writeText(doc, text, font, color, width, size, left, align) {
  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(doc, match[1], font, color, width, size, left, align);
    } else if (match[2]) {
    } else if (match[3]) {
      writeTextUl(doc, match[3], font, color, width, size, left, align);
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeLineCodeTypescript(doc, text, font, color, width, size, left, align) {
  const keywords = [
    "await", "async", "import", "const", "from", "export", "class", "var", "return"
  ];

  const keyconstants = ["true", "false"];

  const commands = [
    "createComponent",
    "toBeTruthy",
    "configureTestingModule",
    "beforeEach",
    "describe",
    "compileComponents",
    "expect",
    "toEqual",
  ];

  const regex = new RegExp(
    `\\b(${keywords.join("|")})\\b|` +
    `\\b(${keyconstants.join("|")})\\b|` +
    `\\b(${commands.join("|")})\\b|` +
    `(\\d+(?:\\.\\d+)?)|` +
    `(\\{[^}]+\\})|` +
    `(['"\`][^'"\`]+['"\`])`,
    "g"
  );

  const colors = {
    keywordBlue: "#1990C8",
    constantRed: "#D32F2F",
    commandGreen: "#2F9C0A",
    numberRed: "#D32F2F",
    stringGreen: "#2F9C0A",
    block: "black"
  };

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      doc.font(font)
        .fontSize(size)
        .fillColor(color)
        .text(beforeMatch, left, doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: true
        });
    }

    let matchedText = match[0];
    let matchedColor = colors.keywordBlue;

    if (match[1]) {
      matchedColor = colors.keywordBlue;
    } else if (match[2]) {
      matchedColor = colors.constantRed;
    } else if (match[3]) {
      matchedColor = colors.commandGreen;
    } else if (match[4]) {
      matchedColor = colors.numberRed;
    } else if (match[5]) {
      matchedColor = colors.block;
    } else if (match[6]) {
      matchedColor = colors.stringGreen;
    }

    doc.fillColor(matchedColor).text(matchedText, { continued: true });

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function writeLineCodePython(doc, text, font, color, width, size, left, align) {
  const keywords = [
    "print", "def", "if", "else", "class", "Server", "from","try","except"
  ];

  const keyconstants = ["true", "false"];

  const commands = [
    "import", "as", "do_GET"
  ];

  const regex = new RegExp(
    `\\b(${keywords.join("|")})\\b|` +
    `\\b(${keyconstants.join("|")})\\b|` +
    `\\b(${commands.join("|")})\\b|` +
    `(\\d+(?:\\.\\d+)?)|` +
    `(\\{[^}]+\\})|` +
    `(['"\`][^'"\`]+['"\`])`,
    "g"
  );

  const colors = {
    keywordBlue: "#1990C8",
    constantRed: "#D32F2F",
    commandBlue: "#1990C8",
    numberRed: "#D32F2F",
    stringGreen: "#2F9C0A",
    block: "grey"
  };

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      doc.font(font)
        .fontSize(size)
        .fillColor(color)
        .text(beforeMatch, left, doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: true
        });
    }

    let matchedText = match[0];
    let matchedColor = colors.keywordBlue;

    if (match[1]) {
      matchedColor = colors.keywordBlue;
    } else if (match[2]) {
      matchedColor = colors.constantRed;
    } else if (match[3]) {
      matchedColor = colors.commandBlue;
    } else if (match[4]) {
      matchedColor = colors.numberRed;
    } else if (match[5]) {
      matchedColor = colors.block;
    } else if (match[6]) {
      matchedColor = colors.stringGreen;
    }

    doc.fillColor(matchedColor).text(matchedText, { continued: true });

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function writeLineCodeNginx(doc, text, font, color, width, size, left, align) {
  const keywords = [
    "user", "worker_processes", "pid", "error_log", "include",
    "events", "worker_connections", "http", "sendfile",
    "tcp_nopush", "types_hash_max_size", "default_type",
    "ssl_protocols", "ssl_prefer_server_ciphers", "access_log",
    "gzip", "server", "listen", "root", "index",
    "server_name", "location", "try_files", "proxy_set_header", "proxy_pass",
    "ssl_protocols",
    "ssl_ciphers",
    "ssl_certificate",
    "ssl_certificate_key",
  ];

  const keyconstants = ["on", "768", "2048", "80", "443"];

  const regex = new RegExp(
    `\\b(${keywords.join("|")})\\b|\\b(${keyconstants.join("|")})\\b|(\\{[^}]+\\})|(['"][^'"]+['"])`,
    "g"
  );

  const colors = {
    keyword: "#1990C8",
    constant: "red",
    string: "#2F9C0A",
    block: "black"
  };

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      doc.font(font)
        .fontSize(size)
        .fillColor(color)
        .text(beforeMatch, left, doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: true
        });
    }

    let matchedText = match[0];
    let matchedColor = colors.keyword;

    if (match[1]) {
      matchedColor = colors.keyword;
    } else if (match[2]) {
      matchedColor = colors.constant;
    } else if (match[3]) {
      matchedColor = colors.block;
    } else if (match[4]) {
      matchedColor = colors.string;
    }

    doc.fillColor(matchedColor).text(matchedText, { continued: true });

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function writeLineCodeJavascript(doc, text, font, color, width, size, left, align) {
  const keywords = [
    "require", "use", "static", "join", "get", "sendFile",
    "listen", "log", "createServer", "writeHead", "end",
  ];

  const keyconstants = ["const", "function"];

  const regex = new RegExp(
    `\\b(${keywords.join("|")})\\b|` +
    `\\b(${keyconstants.join("|")})\\b|` +
    `(\\d+(?:\\.\\d+)?)|` +
    `(\\{[^}]+\\})|` +
    `(['"][^'"]+['"])`,
    "g"
  );

  const colors = {
    keywordGreen: "#2F9C0A",
    constantBlue: "#3D90B8",
    number: "#D32F2F",
    stringGreen: "#2F9C0A",
    block: "black"
  };

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      doc.font(font)
        .fontSize(size)
        .fillColor(color)
        .text(beforeMatch, left, doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: true
        });
    }

    let matchedText = match[0];
    let matchedColor = colors.keywordGreen;

    if (match[1]) {
      matchedColor = colors.keywordGreen;
    } else if (match[2]) {
      matchedColor = colors.constantBlue;
    } else if (match[3]) {
      matchedColor = colors.number;
    } else if (match[4]) {
      matchedColor = colors.block;
    } else if (match[5]) {
      matchedColor = colors.stringGreen;
    }

    doc.fillColor(matchedColor).text(matchedText, { continued: true });

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function writeLineCodeHtml(doc, text, font, color, width, size, left, align) {
  const keywords = [
    "base", "body", "html", "head", "script", "meta", "title", "link",
    "div", "header", "section", "h1", "h2", "h3", "h4", "p", "ul", "li", "router-outlet",
    "main", "footer",
  ];

  const attributes = [
    "routerLink", "href", "name", "rel", "lang", "type",
    "function", "gtag", "defer", "src"
  ];

  const regex = new RegExp(
    `\\b(${keywords.join("|")})\\b|` +
    `(\\{[^}]+\\})|` +
    `('[^']+')|` +
    `("[^"]+")|` +
    `\\b(${attributes.join("|")})\\b`,
    "g"
  );

  const colors = {
    keywordRed: "#C92C2C",
    block: "black",
    stringGreen: "#2F9C0A",
    attributeBlue: "#1990C8",
    attributeYellow: "#2F9C0A"
  };

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      doc.font(font)
        .fontSize(size)
        .fillColor(color)
        .text(beforeMatch, left, doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: true
        });
    }

    let matchedText = match[0];
    let matchedColor = colors.keywordRed;

    if (match[1]) {
      matchedColor = colors.keywordRed;
    } else if (match[2]) {
      matchedColor = colors.block;
    } else if (match[3] || match[4]) {
      matchedColor = colors.stringGreen;
    } else if (match[5]) {
      matchedColor = colors.attributeBlue;
    }

    doc.fillColor(matchedColor).text(matchedText, { continued: true });

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
  }
}

function checkPageNew(doc) {
  doc.addPage({
    size: 'A4',
    margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });
}

function writeContentManualLi(doc) {
  const bullet = '•';
  let sizeDownBrFirst = 0.2;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  let itemTextAlign = 'left';

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Installation des outils nécessaires`,
      60,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` sera notre plateforme de développement javascript.`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
      });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`sdfghsfh gfhdf hdfghdfh`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node1`,
      60,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
      });

  doc.font('ARIAL').moveDown(1);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`signifie signifie`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });


  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` Node1`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });



  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node2`,
      60,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Test`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie Test signifie Test signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node`,
      itemTextLeft + 23,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        cotinued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  JS`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` javascript`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });
}

function writeCode(doc, codelanguage, content) {
  const marginX = 70;
  const marginY = doc.y;
  const width = 470;

  let codelanguageFound = false;

  if (codelanguage === 'git') {
    codelanguageFound = true;
    doc.font('ARIAL').fontSize(PDF_CODE.textSize);
    content.split('\n').forEach(line => {
      if (line.trim() === '') {
        doc.moveDown();
      } else {
        const color = line.startsWith('#') ? 'grey' : 'black';
        doc.fillColor(color).text(line, marginX, doc.y, { width, align: 'left', lineGap: 3 });
      }
    });
    const blockHeight = doc.y - marginY + 5;
    doc.strokeColor('grey');
    doc.rect(marginX - 5, marginY - 2, width + 10, blockHeight).stroke()
  }

  if (codelanguage === 'json') {
    codelanguageFound = true;
    doc.font('ARIAL').fontSize(PDF_CODE.textSize);
    let formattedJSON = content;
    try {
      const jsonObject = JSON.parse(content);
      formattedJSON = JSON.stringify(jsonObject, null, 2);
    } catch (e) {
      formattedJSON = content;
    }
    const lines = formattedJSON.split('\n');
    const marginX = 70;
    const marginY = doc.y;
    const width = 470;
    lines.forEach(line => {
      if (line.trim() === '') {
        doc.moveDown();
      } else {
        const keyMatch = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
        const bracketMatch = line.match(/^\s*[{}\[\],]\s*$/);
        if (keyMatch) {
          const indent = keyMatch[1] || '';
          const key = `"${keyMatch[2]}":`;
          const value = keyMatch[3];
          doc.fillColor('#C92C2C').text(indent + key, marginX, doc.y, { continued: true });
          doc.fillColor('#2F9C0A').text(` ${value}`, { width, align: 'left' });
        } else if (bracketMatch) {
          doc.fillColor('grey').text(line, marginX, doc.y, { width, align: 'left' });
        } else {
          doc.fillColor('#2F9C0A').text(line, marginX, doc.y, { width, align: 'left' });
        }
      }
    });
    const blockHeight = doc.y - marginY + 5;
    doc.strokeColor('grey').rect(marginX - 5, marginY - 2, width + 10, blockHeight).stroke();
  }

  if (
    (codelanguage === 'nginx') ||
    (codelanguage === 'javascript') ||
    (codelanguage === 'python') ||
    (codelanguage === 'html') ||
    (codelanguage === 'typescript')) {
    codelanguageFound = true;
    let xCodeBegin = doc.x;
    let yCodeBegin = doc.y;
    let sizeItemCode = 10;

    let maxPageHeight = doc.page.height - doc.page.margins.bottom;
    doc.font("ARIAL").fontSize(sizeItemCode);
    let lines = content.split("\n");
    let estimatedHeight = lines.length * sizeItemCode * 1.2;
    if (yCodeBegin + estimatedHeight > maxPageHeight) {
      sizeItemCode = 8;
      doc.font("ARIAL").fontSize(sizeItemCode);
    }

    lines = content.split('\n');
    lines.forEach((line) => {
      if (line.trim() === '') {
        doc.moveDown();
      } else {
        if (codelanguage === 'html') {
          writeLineCodeHtml(doc,
            line,
            PDF_ITEM.textFont,
            PDF_ITEM.textColor,
            PDF_ITEM.textWidth,
            sizeItemCode,
            PDF_ITEM.textLeft,
          );
        }
        if (codelanguage === 'typescript') {
          writeLineCodeTypescript(doc,
            line,
            PDF_ITEM.textFont,
            PDF_ITEM.textColor,
            PDF_ITEM.textWidth,
            sizeItemCode,
            PDF_ITEM.textLeft,
          );
        }
        if (codelanguage === 'python') {
          writeLineCodePython(doc,
            line,
            PDF_ITEM.textFont,
            PDF_ITEM.textColor,
            PDF_ITEM.textWidth,
            sizeItemCode,
            PDF_ITEM.textLeft,
          );
        }
        if (codelanguage === 'nginx') {
          writeLineCodeNginx(doc,
            line,
            PDF_ITEM.textFont,
            PDF_ITEM.textColor,
            PDF_ITEM.textWidth,
            sizeItemCode,
            PDF_ITEM.textLeft,
          );
        }
        if (codelanguage === 'javascript') {
          writeLineCodeJavascript(doc,
            line,
            PDF_ITEM.textFont,
            PDF_ITEM.textColor,
            PDF_ITEM.textWidth,
            sizeItemCode,
            PDF_ITEM.textLeft,
          );
        }
      }
    });
    doc.moveDown();
    let yCodeEnd = doc.y - yCodeBegin + 4;
    doc.strokeColor('grey');
    doc.rect(xCodeBegin - 4, yCodeBegin - 4, PDF_CODE.textWidth, yCodeEnd).stroke();
  }

  if (codelanguage === 'css') {
    codelanguageFound = true;
    doc.font('ARIAL').fontSize(PDF_CODE.textSize);
    const lines = content.split('\n');
    const marginX = 70;
    const marginY = doc.y;
    const width = 470;

    const COLORS = {
      selector: 'green',
      propertyRed: '#C92C2C',
      value: 'magenta',
      number: 'black',
      comment: 'grey',
      default: 'black',
    };

    const CSS_SELECTORS = [
      'body', 'html', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a',
      'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'input', 'button', 'form', 'label',
      'header', 'footer', 'section', 'article', 'aside', 'nav'
    ];

    const CSS_PROPERTIES = [
      'color', 'background', 'background-color', 'width', 'height', 'margin', 'padding',
      'border', 'display', 'position', 'top', 'left', 'right', 'bottom', 'flex', 'grid',
      'align-items', 'justify-content', 'z-index', 'opacity', 'overflow', 'visibility',
      'cursor', 'font-size', 'font-weight', 'text-align', 'line-height', 'letter-spacing'
    ];

    lines.forEach((line) => {
      if (line.trim() === '') {
        doc.moveDown();
      } else {
        const indentSize = line.length - line.trimStart().length;
        const indentSpace = ' '.repeat(indentSize);

        let formattedLine = indentSpace;
        let lastColor = COLORS.default;

        let tokens = line.split(/(\b(?:body|html|div|span|p|h1|h2|h3|h4|h5|h6|a|ul|ol|li|table|tr|td|th|input|button|form|label|header|footer|section|article|aside|nav)\b|\b(?:color|background|background-color|width|height|margin|padding|border|display|position|top|left|right|bottom|flex|grid|align-items|justify-content|z-index|opacity|overflow|visibility|cursor|font-size|font-weight|text-align|line-height|letter-spacing)\b|(['"])(?:\\.|(?!\2)[^\\])*\2|\b\d+(?:\.\d+)?\b|\/\*.*?\*\/)/g);

        tokens = tokens.filter((token, index, arr) => token !== undefined && token.trim() !== '' && token !== arr[index - 1]);

        tokens.forEach((token) => {
          let color = COLORS.default;

          if (CSS_SELECTORS.includes(token)) {
            color = COLORS.selector;
          } else if (CSS_PROPERTIES.includes(token)) {
            color = COLORS.propertyRed;
          } else if (/^['"].*['"]$/.test(token)) {
            color = COLORS.value;
          } else if (/^\d+(?:\.\d+)?$/.test(token)) {
            color = COLORS.number;
          } else if (/\/\*.*?\*\//.test(token)) {
            color = COLORS.comment;
          }

          if (formattedLine.length > indentSize) {
            doc.fillColor(lastColor).text(formattedLine, marginX, doc.y, { width, align: 'left', continued: true });
            formattedLine = '';
          }
          formattedLine += token + ' ';
          lastColor = color;
        });

        if (formattedLine.length > indentSize) {
          doc.fillColor(lastColor).text(formattedLine.trim(), marginX, doc.y, { width, align: 'left' });
        }
      }
    });

    const blockHeight = doc.y - marginY + 5;
    doc.strokeColor('grey').rect(marginX - 5, marginY - 2, width + 10, blockHeight).stroke();
  }

  if (!codelanguageFound) {
    doc.font('ARIAL').fontSize(PDF_CODE.textSize);
    doc.fillColor('grey');

    doc.text(`${content}`, marginX, doc.y, {
      width,
      align: 'left',
      lineGap: 3,
    });
    const blockHeight = doc.y - marginY + 5;
    doc.strokeColor('grey')
      .rect(marginX - 5, marginY - 2, width + 10, blockHeight)
      .stroke();
  }

}

function formatDate(dateStr, language) {
  const [day, month, year] = dateStr.split("/");

  const monthNames = {
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    fr: [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ]
  };

  if (language === LANGUAGE_TYPE.ENGLISH) {
    return `Update on ${monthNames.en[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  } else if (language === LANGUAGE_TYPE.FRENCH) {
    return `Mise à jour du ${parseInt(day)} ${monthNames.fr[parseInt(month) - 1]} ${year}`;
  }

  return '';
}

function generatePDF(language, data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  const doc = new PDFDocument({
    size: PDF_SIZE,
    margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.registerFont('ARIAL', ARIAL);
  doc.registerFont('ARIALBD', ARIALBD);
  doc.registerFont('ARIALBI', ARIALBI);
  doc.registerFont('ARIALI', ARIALI);

  let pageWidth = doc.page.width;
  let pageHeight = doc.page.height;

  let marginLeft = doc.page.margins.left;
  let marginRight = doc.page.margins.right;
  let marginTop = doc.page.margins.top;
  let marginBottom = doc.page.margins.bottom;

  let contentWidth = pageWidth - marginLeft - marginRight;
  let contentHeight = pageHeight - marginTop - marginBottom;
  let firstTitle = true;
  let stepChapter = 1;
  let heightMoveDown = 0;
  let lastWriteCode = false;
  let lineHeight = 0;
  // writeContentManualLi(doc);

  let name = data.name;

  data.elements.forEach((element, index) => {

    let chapternameimage = element.chapternameimage;
    let typeimage = element.typeimage;
    let typetext = element.typetext;
    let typeintro = element.typeintro;
    let typecode = element.typecode;
    let typechapter = element.typechapter;
    let typesignup = element.typesignup;
    let libelleImage = element.libelleimage;
    let nameImage = element.nameimage;
    let codefilename = element.codefilename;
    let codelanguage = element.codelanguage;

    let pathImages = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/';
    let releaseDate = data.releaseDate;

    let textFormat = '';

    let linkable = element.linkable;
    let title = element.title;
    let content = element.content;

    let displayText = false;
    let displayImage = false;
    let displayIntro = false;
    let displayChapter = false;
    let displayCode = false;

    if (!typeimage && !typeintro && !typecode && !typechapter && !typesignup) {
      if (typetext) {
        displayText = true;
      }
    }

    if (!typeimage && typeintro && !typecode && !typechapter && !typesignup) {
      if (typetext) {
        displayIntro = true;
      }
    }

    if (typeimage) {
      displayImage = true;
    }

    if (typechapter) {
      displayChapter = true;
    }

    if (typecode) {
      displayCode = true;
    }

    if (displayIntro) {

      let nameimageBanner = 'introduction-banner.png';
      let imagePathBanner = pathImages + nameimageBanner;
      const imageBanner = doc.openImage(imagePathBanner);
      let imgWidthBanner = imageBanner.width;
      let imgHeightBanner = imageBanner.height;
      let scaleFactorBanner = 0.75;
      let newWidthBanner = imgWidthBanner * scaleFactorBanner;
      let newHeightBanner = imgHeightBanner * scaleFactorBanner;

      let centerX = (pageWidth - newWidthBanner) / 2;
      let posY = 18;
      doc.image(imagePathBanner, centerX, posY, {
        width: newWidthBanner,
        height: newHeightBanner,
      });

      let nameimageIntro = 'introduction-background.png';
      let imagePathIntro = pathImages + nameimageIntro;
      doc.image(imagePathIntro, 0, 60, {
        width: pageWidth,
        height: pageHeight,
      });

      const nameImageTutorial = name + '-intro.png';
      const imagePathTutorial = path.join(pathImages, nameImageTutorial);

      const imageTutorial = doc.openImage(imagePathTutorial);
      let imgWidthTutorial = imageTutorial.width * 0.58;
      let imgHeightTutorial = imageTutorial.height * 0.58;
      doc.image(imagePathTutorial, 350, 384, {
        width: imgWidthTutorial,
        height: imgHeightTutorial,
      });
      doc.rect(350, 384, imgWidthTutorial, imgHeightTutorial)
        .strokeColor('#ffffff')
        .lineWidth(2)
        .stroke();

      doc.y += 65;
      doc.font('ARIALBD').fontSize(34).fillColor(PDF_INTRO.titleColor).text(title, PDF_LEFT, doc.y, {
        width: 500,
        align: 'center'
      });

      doc.y += 40;
      textColorTitle = 'grey';
      let guideTitle = 'Guide Complet';
      if (language === LANGUAGE_TYPE.ENGLISH) {
        guideTitle = 'Complete Guide';
      }
      doc.font('ARIALBD').fontSize(26).fillColor('#D9D9D9').text(guideTitle, PDF_LEFT, doc.y, {
        width: 500,
        align: 'center'
      });

      const linePosY = doc.y + 45;
      addLine('white', doc, linePosY, 1);

      doc.y += 60;
      textColorTitle = 'white';
      let releaseDateTmp = formatDate(releaseDate, language);
      doc.font('ARIALBD').fontSize(12).fillColor(textColorTitle).text(releaseDateTmp, PDF_LEFT, doc.y, {
        width: 500,
        align: 'right'
      });

      content = sanitize(content);
      content = addParagraph(content);
      doc.y += 30;
      lastWriteCode = false;
      writeText(doc,
        content,
        PDF_INTRO.textFont,
        PDF_INTRO.textColor,
        PDF_INTRO.textWidth,
        PDF_INTRO.textSize,
        PDF_INTRO.textLeft,
      );

      doc.font('ARIALBD').fontSize(14).fillColor('white').text('www.ganatan.com', 350, 760, {
        width: 200,
        align: 'right'
      });



      doc.addPage({
        size: PDF_SIZE,
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      });


    }

    if (displayChapter) {
      firstTitle = true;

      doc.addPage({
        size: PDF_SIZE,
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      });

      let nameimageIntro = 'introduction-background.png';
      let imagePathIntro = pathImages + nameimageIntro;
      doc.image(imagePathIntro, 0, 0, {
        width: pageWidth,
        height: pageHeight,
      });

      const nameImageTutorial = chapternameimage;
      const imagePathTutorial = path.join(pathImages, nameImageTutorial);
      addImageWithShadow(false, doc, imagePathTutorial, 350, 280);
      let stepChapterStr = 'Etape';
      if (language === LANGUAGE_TYPE.ENGLISH) {
        stepChapterStr = 'Step';
      }
      doc.y += 10;
      doc.font('ARIALBD').fontSize(24).fillColor(PDF_CHAPTER.titleColor).text(`${stepChapterStr} ${stepChapter}`, PDF_LEFT, doc.y, {
        width: 500,
        align: 'center'
      });
      stepChapter += 1;
      doc.y += 20;
      doc.font('ARIALBD').fontSize(34).fillColor(PDF_CHAPTER.titleColor).text(title, PDF_LEFT, doc.y, {
        width: 500,
        align: 'center'
      });

      content = sanitize(content);
      content = addParagraph(content);
      doc.y += 80;
      lastWriteCode = false;
      writeText(doc,
        content,
        PDF_CHAPTER.textFont,
        PDF_CHAPTER.textColor,
        PDF_CHAPTER.textWidth,
        PDF_CHAPTER.textSize,
        PDF_CHAPTER.textLeft,
      );

      doc.addPage({
        size: PDF_SIZE,
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      });

    }

    if (displayText) {
      let textHeight = 0;
      textFormat = `${title}`;
      if (linkable) {
        doc.font(PDF_ITEM.titleFont).fontSize(PDF_ITEM.titleSize);
        textHeight = doc.heightOfString(textFormat, {
          width: PDF_ITEM.titleWidth,
          align: 'center',
          lineGap: 3,
        });
      }
      content = addParagraph(content);
      content = sanitize(content);
      doc.font(PDF_ITEM.textFont).fontSize(PDF_ITEM.textSize);
      textHeight += doc.heightOfString(`${content}`, {
        width: PDF_ITEM.textWidth,
        align: 'left',
        lineGap: 3,
      });
      if (lastWriteCode === false) {
        lineHeight = doc.currentLineHeight();
      }
      if (linkable) {
        spaceAdded = PDF_DOWN.sizeBrSecond * lineHeight;
        textHeight = textHeight + spaceAdded;
      }
      while (doc.y + textHeight > contentHeight) {
        checkPageNew(doc);
        textHeight -= contentHeight;
      }
      if (linkable) {
        if (firstTitle === false) {
          doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
          if (lastWriteCode === false) {
            addLine('grey', doc, doc.y, 1);
          }
        }
        firstTitle = false;
        xCentered = marginLeft + (contentWidth - PDF_ITEM.titleWidth) / 2;
        doc.font(PDF_ITEM.titleFont).fontSize(PDF_ITEM.titleSize);
        doc.fillColor(PDF_ITEM.titleColor)
          .text(textFormat, xCentered, doc.y, {
            width: PDF_ITEM.titleWidth,
            align: 'center',
            lineGap: 3,
          });
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
      } else {
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
      }
      lastWriteCode = false;
      writeText(doc,
        content,
        PDF_ITEM.textFont,
        PDF_ITEM.textColor,
        PDF_ITEM.textWidth,
        PDF_ITEM.textSize,
        PDF_ITEM.textLeft,
      );
    }

    if (displayImage) {
      textWidth = 500;
      xCentered = marginLeft + (contentWidth - textWidth) / 2;
      doc.font('ARIALBD').fontSize(14);

      let libelleImageTmp = libelleImage;
      if (libelleImageTmp === '') {
        libelleImageTmp = ' ';
      }

      textHeight = doc.heightOfString(`${libelleImageTmp}`, {
        width: textWidth,
        align: 'center',
        lineGap: 3,
      });

      heightMoveDown = doc.currentLineHeight() * 0.7;
      textHeight += heightMoveDown;
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);

      const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameImage;
      const image = doc.openImage(imagePath);

      let imgWidth = image.width * 0.75;
      let imgHeight = image.height * 0.75;

      const pageWidthImage = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeightImage = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

      let scale = Math.min(pageWidthImage / imgWidth, pageHeightImage / imgHeight, 1);
      let imgWidthResize = imgWidth * scale;
      let imgHeightResize = imgHeight * scale;

      while (doc.y + textHeight + imgHeightResize > pageHeightImage) {
        checkPageNew(doc);
        textHeight -= pageHeightImage;
      }

      doc.font('ARIALBD').fontSize(14).fillColor('black')
        .text(`${libelleImageTmp}`, xCentered, doc.y, {
          width: textWidth,
          align: 'center',
          lineGap: 3,
        });

      xCentered = doc.page.margins.left + (pageWidthImage - imgWidthResize) / 2;

      doc.image(imagePath, xCentered, doc.y, {
        width: imgWidthResize,
        height: imgHeightResize,
      });

      // doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);

      doc.y += imgHeightResize + 10;
    }

    if (displayCode) {

      textWidth = 500;
      xCentered = marginLeft + (contentWidth - textWidth) / 2;
      doc.font('ARIALBD').fontSize(12);
      let codefilenameTmp = codefilename;
      if (codefilenameTmp === '') {
        codefilenameTmp = ' ';
      }
      textHeight = doc.heightOfString(`${codefilenameTmp}`, xCentered, doc.y, {
        width: textWidth,
        align: 'center',
        lineGap: 3,
      });
      textHeight += 10;
      content = sanitize(content);
      doc.font('ARIAL').fontSize(10);
      let textHeightCode = doc.heightOfString(`${content}`, 70, doc.y, {
        width: 470, align: 'left', lineGap: 3,
      });
      textHeight = textHeight + textHeightCode;
      while (doc.y + textHeight > contentHeight) {
        checkPageNew(doc);
        textHeight -= contentHeight;
      }
      spaceAdded = PDF_DOWN.sizeBrSecond * lineHeight;
      textHeight = textHeight + spaceAdded;
      doc.font('ARIALBD').fontSize(12);
      doc.fillColor('#2196f3')
        .text(`${codefilenameTmp}`, xCentered, doc.y, {
          width: textWidth,
          align: 'center',
          lineGap: 3,
        });
      doc.y += 10;
      lastWriteCode = true;
      writeCode(doc, codelanguage, content);
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
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


