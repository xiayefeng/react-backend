;(function (win) {
  var doc = win.document
  var docEl = doc.documentElement
  var metaEl = doc.querySelector('meta[name="viewport"]')
  var drp = win.devicePixelRatio || 1
  if (drp >= 3) {
    drp = 3
  } else if (drp >= 2) {
    drp = 2
  } else {
    drp = 1
  }
  var scale = 1 / drp

  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute(
      'content',
      'width=device-width, initial-scale=' +
        scale +
        ', minimum-scale=' +
        scale +
        ', maximum-scale=2'
    )
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl)
    } else {
      var wrap = doc.createElement('div')
      wrap.appendChild(metaEl)
      doc.write(wrap.innerHTML)
    }
  }
  calcBaseRem()
  function calcBaseRem () {
    var docEl = document.documentElement
    var resizeEvt =
      'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = null
    // console.log(isMobile())
    if (isMobile()) {
      recalc = function () {
        var clientWidth = docEl.clientWidth
        // console.log(clientWidth)
        var clientHight = docEl.clientHeight
        // console.log(clientHight)
        var width = Math.min(clientWidth, clientHight)
        if (typeof clientWidth === 'undefined') return
        docEl.style.fontSize = width / (25 * drp) + 'px'
        // console.log(width / 10)
      }
    } else {
      recalc = function () {
        var clientWidth = docEl.clientWidth
        if (clientWidth === undefined) return
        if (clientWidth <= 720) {
          docEl.style.fontSize = '18px'
        } else if (clientWidth > 720 && clientWidth <= 1200) {
          docEl.style.fontSize = '14px'
        } else {
          docEl.style.fontSize = '14px'
        }
      }
    }

    if (!document.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
  }
  function isMobile () {
    var agent = navigator.userAgent
    return (
      agent.match(/Android/i) ||
      agent.indexOf('iPhone') > 0 ||
      agent.indexOf('iPad') > 0
    )
  }
  win.addEventListener('offline', function () {
    console.log('你断网啦！')
  })
  win.addEventListener('load', function () {
    var now = Date.now()
    var startTime = +sessionStorage.getItem('startTime')
    var time = now - startTime
    console.log(time)
  })
})(window)
