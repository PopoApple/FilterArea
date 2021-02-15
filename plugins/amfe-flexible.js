import { isMobile } from '~/utils'

(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  // function setBodyFontSize () {
  //   if (document.body) {
  //     document.body.style.fontSize = (12 * dpr) + 'px'
  //   }
  //   else {
  //     document.addEventListener('DOMContentLoaded', setBodyFontSize)
  //   }
  // }
  // setBodyFontSize();

  // set 1rem = viewWidth / 10

  function setRemUnit () {
    var w = docEl.clientWidth
    var rem
    var rootClass
    if (isMobile(navigator.userAgent)) {
      rem = w * 750 / 750
      rootClass = 'RootIsMobile'
    } else {
      w = w > 1220 ? 1220 : (w < 768 ? 768 : w)
      rem = w * 750 / 1220
      rootClass = 'RootNotMobile'
    }
    rem = rem / 10
    docEl.style.fontSize = rem + 'px'
    docEl.setAttribute('class', rootClass)
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
