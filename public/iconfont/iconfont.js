!(function(a) {
  var e,
    n =
      '<svg><symbol id="icon-fanhui" viewBox="0 0 1024 1024"><path d="M512 1255.489906"  ></path><path d="M498.081951 943.76654"  ></path><path d="M602.774335 744.103938 359.003798 500.3334 602.774335 256.562862c8.801119-8.801119 8.801119-23.128523 0-31.827304l0 0c-8.801119-8.801119-23.128523-8.801119-31.827304 0L313.360784 482.321807c-4.912253 4.912253-7.061363 11.564261-6.447332 18.011593-0.614032 6.447332 1.535079 13.09934 6.447332 18.011593l257.586248 257.586248c8.801119 8.801119 23.128523 8.801119 31.827304 0C611.575455 767.232461 611.575455 752.905057 602.774335 744.103938z"  ></path></symbol><symbol id="icon-tijiaochenggong" viewBox="0 0 1024 1024"><path d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m307.2 343.771429s-267.702857 295.497143-327.68 365.714285c-59.977143 70.217143-106.788571 0-106.788571 0L210.651429 529.554286s-27.794286-42.422857 21.942857-81.92c46.811429-38.034286 84.845714 0 84.845714 0l122.88 128.731428L746.057143 291.108571s29.257143-20.48 59.977143 5.851429c23.405714 21.942857 13.165714 46.811429 13.165714 46.811429z" fill="#68BF7B" ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (t && !a.__iconfont__svg__cssinject__) {
    a.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
        setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener("DOMContentLoaded", t, !1), e();
        };
        document.addEventListener("DOMContentLoaded", t, !1);
      }
    else
      document.attachEvent &&
        ((o = e),
        (i = a.document),
        (c = !1),
        (d = function() {
          try {
            i.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(d, 50);
          }
          n();
        })(),
        (i.onreadystatechange = function() {
          "complete" == i.readyState && ((i.onreadystatechange = null), n());
        }));
    function n() {
      c || ((c = !0), o());
    }
    var o, i, c, d;
  })(function() {
    var e, t;
    ((e = document.createElement("div")).innerHTML = n),
      (n = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (function(e, t) {
          t.firstChild
            ? (function(e, t) {
                t.parentNode.insertBefore(e, t);
              })(e, t.firstChild)
            : t.appendChild(e);
        })(t, document.body));
  });
})(window);
