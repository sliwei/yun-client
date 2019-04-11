import React from "react";

export default function (name, tp) {
  let tpye = name ? name.split('.') : [''];
  if (tpye.length) {
    tpye = tpye[tpye.length - 1]
  }
  let ret = '';
  switch (tpye) {
    case 'png':
      ret = '#icon-png';
      break;
    case 'java':
      ret = '#icon-java';
      break;
    case 'jar':
      ret = '#icon-java';
      break;
    case 'psd':
      ret = '#icon-psd';
      break;
    case 'txt':
      ret = '#icon-txt';
      break;
    case 'ppt':
      ret = '#icon-ppt';
      break;
    case 'pptx':
      ret = '#icon-ppt';
      break;
    case 'upload':
      ret = '#icon-upload';
      break;
    case 'mpeg1-4':
      ret = '#icon-video';
      break;
    case 'rm':
      ret = '#icon-video';
      break;
    case 'rmvb':
      ret = '#icon-video';
      break;
    case 'mov':
      ret = '#icon-video';
      break;
    case 'mtv':
      ret = '#icon-video';
      break;
    case 'dat':
      ret = '#icon-video';
      break;
    case 'wmv':
      ret = '#icon-video';
      break;
    case 'avi':
      ret = '#icon-video';
      break;
    case '3gp':
      ret = '#icon-video';
      break;
    case 'amv':
      ret = '#icon-video';
      break;
    case 'dmv':
      ret = '#icon-video';
      break;
    case 'flv':
      ret = '#icon-video';
      break;
    case 'zip':
      ret = '#icon-zip';
      break;
    case 'word':
      ret = '#icon-word';
      break;
    case 'html':
      ret = '#icon-html';
      break;
    case 'jpg':
      ret = '#icon-jpg';
      break;
    case 'jpeg':
      ret = '#icon-jpg';
      break;
    case 'mp3':
      ret = '#icon-mp3';
      break;
    case 'wav':
      ret = '#icon-mp3';
      break;
    case 'plac':
      ret = '#icon-mp3';
      break;
    case 'ogg':
      ret = '#icon-mp3';
      break;
    case 'ape':
      ret = '#icon-mp3';
      break;
    case 'pdf':
      ret = '#icon-pdf';
      break;
    case 'xlsx':
      ret = '#icon-excel';
      break;
    case 'xls':
      ret = '#icon-excel';
      break;
    case 'csv':
      ret = '#icon-excel';
      break;
    case 'download':
      ret = '#icon-download';
      break;
    case 'ai':
      ret = '#icon-ai';
      break;
    case 'gif':
      ret = '#icon-gif';
      break;
    default:
      ret = '#icon-white';
      break;
  }
  if (tp >= 0) {
    switch (tp) {
      case '1':
        ret = '#icon-folder-group';
        break;
      case '2':
        ret = '#icon-folder-locked';
        break;
      case '3':
        ret = '#icon-folder-open';
        break;
      case '4':
        ret = '#icon-folder-personal';
        break;
      case '5':
        ret = '#icon-folder-share';
        break;
      default:
        ret = '#icon-folder';
        break;
    }
  }
  return ret;
}
