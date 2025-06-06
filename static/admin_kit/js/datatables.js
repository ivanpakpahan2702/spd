/*! For license information please see datatables.js.LICENSE.txt */
!(function () {
  var t = {
      5253: function (t, e, n) {
        var r, o;
        (r = [n(8942), n(991), n(8336)]),
          void 0 ===
            (o = function (t) {
              return (function (t, e, n, r, o, i) {
                "use strict";
                var a,
                  s,
                  l = t.fn.dataTable;
                function c() {
                  return a || e.JSZip;
                }
                function u() {
                  return s || e.pdfMake;
                }
                (l.Buttons.pdfMake = function (t) {
                  if (!t) return u();
                  s = t;
                }),
                  (l.Buttons.jszip = function (t) {
                    if (!t) return c();
                    a = t;
                  });
                var d = (function (t) {
                  if (
                    !(
                      void 0 === t ||
                      ("undefined" != typeof navigator &&
                        /MSIE [1-9]\./.test(navigator.userAgent))
                    )
                  ) {
                    var e = t.document,
                      n = function () {
                        return t.URL || t.webkitURL || t;
                      },
                      r = e.createElementNS(
                        "http://www.w3.org/1999/xhtml",
                        "a"
                      ),
                      o = "download" in r,
                      a = function (t) {
                        var e = new MouseEvent("click");
                        t.dispatchEvent(e);
                      },
                      s = /constructor/i.test(t.HTMLElement) || t.safari,
                      l = /CriOS\/[\d]+/.test(navigator.userAgent),
                      c = function (e) {
                        (t.setImmediate || t.setTimeout)(function () {
                          throw e;
                        }, 0);
                      },
                      u = "application/octet-stream",
                      d = 4e4,
                      f = function (t) {
                        setTimeout(function () {
                          "string" == typeof t
                            ? n().revokeObjectURL(t)
                            : t.remove();
                        }, d);
                      },
                      p = function (t, e, n) {
                        for (var r = (e = [].concat(e)).length; r--; ) {
                          var o = t["on" + e[r]];
                          if ("function" == typeof o)
                            try {
                              o.call(t, n || t);
                            } catch (t) {
                              c(t);
                            }
                        }
                      },
                      h = function (t) {
                        return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                          t.type
                        )
                          ? new Blob([String.fromCharCode(65279), t], {
                              type: t.type,
                            })
                          : t;
                      },
                      m = function (e, c, d) {
                        d || (e = h(e));
                        var m,
                          g = this,
                          v = e.type === u,
                          b = function () {
                            p(
                              g,
                              "writestart progress write writeend".split(" ")
                            );
                          },
                          y = function () {
                            if ((l || (v && s)) && t.FileReader) {
                              var r = new FileReader();
                              return (
                                (r.onloadend = function () {
                                  var e = l
                                    ? r.result
                                    : r.result.replace(
                                        /^data:[^;]*;/,
                                        "data:attachment/file;"
                                      );
                                  t.open(e, "_blank") || (t.location.href = e),
                                    (e = i),
                                    (g.readyState = g.DONE),
                                    b();
                                }),
                                r.readAsDataURL(e),
                                void (g.readyState = g.INIT)
                              );
                            }
                            m || (m = n().createObjectURL(e)),
                              v
                                ? (t.location.href = m)
                                : t.open(m, "_blank") || (t.location.href = m),
                              (g.readyState = g.DONE),
                              b(),
                              f(m);
                          };
                        if (((g.readyState = g.INIT), o))
                          return (
                            (m = n().createObjectURL(e)),
                            void setTimeout(function () {
                              (r.href = m),
                                (r.download = c),
                                a(r),
                                b(),
                                f(m),
                                (g.readyState = g.DONE);
                            })
                          );
                        y();
                      },
                      g = m.prototype,
                      v = function (t, e, n) {
                        return new m(t, e || t.name || "download", n);
                      };
                    return "undefined" != typeof navigator &&
                      navigator.msSaveOrOpenBlob
                      ? function (t, e, n) {
                          return (
                            (e = e || t.name || "download"),
                            n || (t = h(t)),
                            navigator.msSaveOrOpenBlob(t, e)
                          );
                        }
                      : ((g.abort = function () {}),
                        (g.readyState = g.INIT = 0),
                        (g.WRITING = 1),
                        (g.DONE = 2),
                        (g.error =
                          g.onwritestart =
                          g.onprogress =
                          g.onwrite =
                          g.onabort =
                          g.onerror =
                          g.onwriteend =
                            null),
                        v);
                  }
                })(
                  ("undefined" != typeof self && self) ||
                    (void 0 !== e && e) ||
                    this.content
                );
                l.fileSave = d;
                var f = function (t) {
                    var e = "Sheet1";
                    return (
                      t.sheetName &&
                        (e = t.sheetName.replace(/[\[\]\*\/\\\?\:]/g, "")),
                      e
                    );
                  },
                  p = function (t) {
                    return t.newline
                      ? t.newline
                      : navigator.userAgent.match(/Windows/)
                      ? "\r\n"
                      : "\n";
                  },
                  h = function (t, e) {
                    for (
                      var n = p(e),
                        r = t.buttons.exportData(e.exportOptions),
                        o = e.fieldBoundary,
                        a = e.fieldSeparator,
                        s = new RegExp(o, "g"),
                        l = e.escapeChar !== i ? e.escapeChar : "\\",
                        c = function (t) {
                          for (var e = "", n = 0, r = t.length; n < r; n++)
                            n > 0 && (e += a),
                              (e += o
                                ? o + ("" + t[n]).replace(s, l + o) + o
                                : t[n]);
                          return e;
                        },
                        u = e.header ? c(r.header) + n : "",
                        d = e.footer && r.footer ? n + c(r.footer) : "",
                        f = [],
                        h = 0,
                        m = r.body.length;
                      h < m;
                      h++
                    )
                      f.push(c(r.body[h]));
                    return { str: u + f.join(n) + d, rows: f.length };
                  },
                  m = function () {
                    if (
                      -1 === navigator.userAgent.indexOf("Safari") ||
                      -1 !== navigator.userAgent.indexOf("Chrome") ||
                      -1 !== navigator.userAgent.indexOf("Opera")
                    )
                      return !1;
                    var t = navigator.userAgent.match(
                      /AppleWebKit\/(\d+\.\d+)/
                    );
                    return !!(t && t.length > 1 && 1 * t[1] < 603.1);
                  };
                function g(t) {
                  for (
                    var e = "A".charCodeAt(0),
                      n = "Z".charCodeAt(0) - e + 1,
                      r = "";
                    t >= 0;

                  )
                    (r = String.fromCharCode((t % n) + e) + r),
                      (t = Math.floor(t / n) - 1);
                  return r;
                }
                try {
                  var v,
                    b = new XMLSerializer();
                } catch (t) {}
                function y(n, r) {
                  v === i &&
                    (v =
                      -1 ===
                      b
                        .serializeToString(
                          new e.DOMParser().parseFromString(
                            S["xl/worksheets/sheet1.xml"],
                            "text/xml"
                          )
                        )
                        .indexOf("xmlns:r")),
                    t.each(r, function (e, r) {
                      if (t.isPlainObject(r)) y(n.folder(e), r);
                      else {
                        if (v) {
                          var o,
                            i,
                            a = r.childNodes[0],
                            s = [];
                          for (o = a.attributes.length - 1; o >= 0; o--) {
                            var l = a.attributes[o].nodeName,
                              c = a.attributes[o].nodeValue;
                            -1 !== l.indexOf(":") &&
                              (s.push({ name: l, value: c }),
                              a.removeAttribute(l));
                          }
                          for (o = 0, i = s.length; o < i; o++) {
                            var u = r.createAttribute(
                              s[o].name.replace(":", "_dt_b_namespace_token_")
                            );
                            (u.value = s[o].value), a.setAttributeNode(u);
                          }
                        }
                        var d = b.serializeToString(r);
                        v &&
                          (-1 === d.indexOf("<?xml") &&
                            (d =
                              '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                              d),
                          (d = (d = d.replace(
                            /_dt_b_namespace_token_/g,
                            ":"
                          )).replace(/xmlns:NS[\d]+="" NS[\d]+:/g, ""))),
                          (d = d.replace(
                            /<([^<>]*?) xmlns=""([^<>]*?)>/g,
                            "<$1 $2>"
                          )),
                          n.file(e, d);
                      }
                    });
                }
                function x(e, n, r) {
                  var o = e.createElement(n);
                  return (
                    r &&
                      (r.attr && t(o).attr(r.attr),
                      r.children &&
                        t.each(r.children, function (t, e) {
                          o.appendChild(e);
                        }),
                      null !== r.text &&
                        r.text !== i &&
                        o.appendChild(e.createTextNode(r.text))),
                    o
                  );
                }
                function w(t, e) {
                  var n,
                    r,
                    o,
                    a = t.header[e].length;
                  t.footer &&
                    t.footer[e].length > a &&
                    (a = t.footer[e].length);
                  for (var s = 0, l = t.body.length; s < l; s++) {
                    var c = t.body[s][e];
                    if (
                      (-1 !==
                      (o = null !== c && c !== i ? c.toString() : "").indexOf(
                        "\n"
                      )
                        ? ((r = o.split("\n")).sort(function (t, e) {
                            return e.length - t.length;
                          }),
                          (n = r[0].length))
                        : (n = o.length),
                      n > a && (a = n),
                      a > 40)
                    )
                      return 54;
                  }
                  return (a *= 1.35) > 6 ? a : 6;
                }
                var S = {
                    "_rels/.rels":
                      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
                    "xl/_rels/workbook.xml.rels":
                      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
                    "[Content_Types].xml":
                      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
                    "xl/workbook.xml":
                      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets><definedNames/></workbook>',
                    "xl/worksheets/sheet1.xml":
                      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',
                    "xl/styles.xml":
                      '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="68"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>',
                  },
                  C = [
                    {
                      match: /^\-?\d+\.\d%$/,
                      style: 60,
                      fmt: function (t) {
                        return t / 100;
                      },
                    },
                    {
                      match: /^\-?\d+\.?\d*%$/,
                      style: 56,
                      fmt: function (t) {
                        return t / 100;
                      },
                    },
                    { match: /^\-?\$[\d,]+.?\d*$/, style: 57 },
                    { match: /^\-?£[\d,]+.?\d*$/, style: 58 },
                    { match: /^\-?€[\d,]+.?\d*$/, style: 59 },
                    { match: /^\-?\d+$/, style: 65 },
                    { match: /^\-?\d+\.\d{2}$/, style: 66 },
                    {
                      match: /^\([\d,]+\)$/,
                      style: 61,
                      fmt: function (t) {
                        return -1 * t.replace(/[\(\)]/g, "");
                      },
                    },
                    {
                      match: /^\([\d,]+\.\d{2}\)$/,
                      style: 62,
                      fmt: function (t) {
                        return -1 * t.replace(/[\(\)]/g, "");
                      },
                    },
                    { match: /^\-?[\d,]+$/, style: 63 },
                    { match: /^\-?[\d,]+\.\d{2}$/, style: 64 },
                    {
                      match: /^[\d]{4}\-[01][\d]\-[0123][\d]$/,
                      style: 67,
                      fmt: function (t) {
                        return Math.round(25569 + Date.parse(t) / 864e5);
                      },
                    },
                  ];
                return (
                  (l.ext.buttons.copyHtml5 = {
                    className: "buttons-copy buttons-html5",
                    text: function (t) {
                      return t.i18n("buttons.copy", "Copy");
                    },
                    action: function (e, r, o, i) {
                      this.processing(!0);
                      var a = this,
                        s = h(r, i),
                        l = r.buttons.exportInfo(i),
                        c = p(i),
                        u = s.str,
                        d = t("<div/>").css({
                          height: 1,
                          width: 1,
                          overflow: "hidden",
                          position: "fixed",
                          top: 0,
                          left: 0,
                        });
                      l.title && (u = l.title + c + c + u),
                        l.messageTop && (u = l.messageTop + c + c + u),
                        l.messageBottom && (u = u + c + c + l.messageBottom),
                        i.customize && (u = i.customize(u, i, r));
                      var f = t("<textarea readonly/>").val(u).appendTo(d);
                      if (n.queryCommandSupported("copy")) {
                        d.appendTo(r.table().container()),
                          f[0].focus(),
                          f[0].select();
                        try {
                          var m = n.execCommand("copy");
                          if ((d.remove(), m))
                            return (
                              r.buttons.info(
                                r.i18n(
                                  "buttons.copyTitle",
                                  "Copy to clipboard"
                                ),
                                r.i18n(
                                  "buttons.copySuccess",
                                  {
                                    1: "Copied one row to clipboard",
                                    _: "Copied %d rows to clipboard",
                                  },
                                  s.rows
                                ),
                                2e3
                              ),
                              void this.processing(!1)
                            );
                        } catch (t) {}
                      }
                      var g = t(
                        "<span>" +
                          r.i18n(
                            "buttons.copyKeys",
                            "Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape."
                          ) +
                          "</span>"
                      ).append(d);
                      r.buttons.info(
                        r.i18n("buttons.copyTitle", "Copy to clipboard"),
                        g,
                        0
                      ),
                        f[0].focus(),
                        f[0].select();
                      var v = t(g).closest(".dt-button-info"),
                        b = function () {
                          v.off("click.buttons-copy"),
                            t(n).off(".buttons-copy"),
                            r.buttons.info(!1);
                        };
                      v.on("click.buttons-copy", b),
                        t(n)
                          .on("keydown.buttons-copy", function (t) {
                            27 === t.keyCode && (b(), a.processing(!1));
                          })
                          .on(
                            "copy.buttons-copy cut.buttons-copy",
                            function () {
                              b(), a.processing(!1);
                            }
                          );
                    },
                    exportOptions: {},
                    fieldSeparator: "\t",
                    fieldBoundary: "",
                    header: !0,
                    footer: !1,
                    title: "*",
                    messageTop: "*",
                    messageBottom: "*",
                  }),
                  (l.ext.buttons.csvHtml5 = {
                    bom: !1,
                    className: "buttons-csv buttons-html5",
                    available: function () {
                      return e.FileReader !== i && e.Blob;
                    },
                    text: function (t) {
                      return t.i18n("buttons.csv", "CSV");
                    },
                    action: function (t, e, r, o) {
                      this.processing(!0);
                      var i = h(e, o).str,
                        a = e.buttons.exportInfo(o),
                        s = o.charset;
                      o.customize && (i = o.customize(i, o, e)),
                        !1 !== s
                          ? (s || (s = n.characterSet || n.charset),
                            s && (s = ";charset=" + s))
                          : (s = ""),
                        o.bom && (i = String.fromCharCode(65279) + i),
                        d(
                          new Blob([i], { type: "text/csv" + s }),
                          a.filename,
                          !0
                        ),
                        this.processing(!1);
                    },
                    filename: "*",
                    extension: ".csv",
                    exportOptions: {},
                    fieldSeparator: ",",
                    fieldBoundary: '"',
                    escapeChar: '"',
                    charset: null,
                    header: !0,
                    footer: !1,
                  }),
                  (l.ext.buttons.excelHtml5 = {
                    className: "buttons-excel buttons-html5",
                    available: function () {
                      return e.FileReader !== i && c() !== i && !m() && b;
                    },
                    text: function (t) {
                      return t.i18n("buttons.excel", "Excel");
                    },
                    action: function (e, n, r, o) {
                      this.processing(!0);
                      var a,
                        s,
                        l,
                        u,
                        p = this,
                        h = 0,
                        m = function (e) {
                          var n = S[e];
                          return t.parseXML(n);
                        },
                        v = m("xl/worksheets/sheet1.xml"),
                        b = v.getElementsByTagName("sheetData")[0],
                        _ = {
                          _rels: { ".rels": m("_rels/.rels") },
                          xl: {
                            _rels: {
                              "workbook.xml.rels": m(
                                "xl/_rels/workbook.xml.rels"
                              ),
                            },
                            "workbook.xml": m("xl/workbook.xml"),
                            "styles.xml": m("xl/styles.xml"),
                            worksheets: { "sheet1.xml": v },
                          },
                          "[Content_Types].xml": m("[Content_Types].xml"),
                        },
                        T = n.buttons.exportData(o.exportOptions),
                        D = function (t) {
                          u = x(v, "row", { attr: { r: (l = h + 1) } });
                          for (var e = 0, n = t.length; e < n; e++) {
                            var r = g(e) + "" + l,
                              a = null;
                            if (null === t[e] || t[e] === i || "" === t[e]) {
                              if (!0 !== o.createEmptyCells) continue;
                              t[e] = "";
                            }
                            var s = t[e];
                            t[e] =
                              "function" == typeof t[e].trim
                                ? t[e].trim()
                                : t[e];
                            for (var c = 0, d = C.length; c < d; c++) {
                              var f = C[c];
                              if (
                                t[e].match &&
                                !t[e].match(/^0\d+/) &&
                                t[e].match(f.match)
                              ) {
                                var p = t[e].replace(/[^\d\.\-]/g, "");
                                f.fmt && (p = f.fmt(p)),
                                  (a = x(v, "c", {
                                    attr: { r: r, s: f.style },
                                    children: [x(v, "v", { text: p })],
                                  }));
                                break;
                              }
                            }
                            if (!a)
                              if (
                                "number" == typeof t[e] ||
                                (t[e].match &&
                                  t[e].match(/^-?\d+(\.\d+)?([eE]\-?\d+)?$/) &&
                                  !t[e].match(/^0\d+/))
                              )
                                a = x(v, "c", {
                                  attr: { t: "n", r: r },
                                  children: [x(v, "v", { text: t[e] })],
                                });
                              else {
                                var m = s.replace
                                  ? s.replace(
                                      /[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,
                                      ""
                                    )
                                  : s;
                                a = x(v, "c", {
                                  attr: { t: "inlineStr", r: r },
                                  children: {
                                    row: x(v, "is", {
                                      children: {
                                        row: x(v, "t", {
                                          text: m,
                                          attr: { "xml:space": "preserve" },
                                        }),
                                      },
                                    }),
                                  },
                                });
                              }
                            u.appendChild(a);
                          }
                          b.appendChild(u), h++;
                        };
                      o.customizeData && o.customizeData(T);
                      var I = function (e, n) {
                          var r = t("mergeCells", v);
                          r[0].appendChild(
                            x(v, "mergeCell", {
                              attr: { ref: "A" + e + ":" + g(n) + e },
                            })
                          ),
                            r.attr("count", parseFloat(r.attr("count")) + 1),
                            t("row:eq(" + (e - 1) + ") c", v).attr("s", "51");
                        },
                        A = n.buttons.exportInfo(o);
                      A.title && (D([A.title], h), I(h, T.header.length - 1)),
                        A.messageTop &&
                          (D([A.messageTop], h), I(h, T.header.length - 1)),
                        o.header &&
                          (D(T.header, h), t("row:last c", v).attr("s", "2")),
                        (a = h);
                      for (var F = 0, k = T.body.length; F < k; F++)
                        D(T.body[F], h);
                      (s = h),
                        o.footer &&
                          T.footer &&
                          (D(T.footer, h), t("row:last c", v).attr("s", "2")),
                        A.messageBottom &&
                          (D([A.messageBottom], h), I(h, T.header.length - 1));
                      var N = x(v, "cols");
                      t("worksheet", v).prepend(N);
                      for (var L = 0, H = T.header.length; L < H; L++)
                        N.appendChild(
                          x(v, "col", {
                            attr: {
                              min: L + 1,
                              max: L + 1,
                              width: w(T, L),
                              customWidth: 1,
                            },
                          })
                        );
                      var j = _.xl["workbook.xml"];
                      t("sheets sheet", j).attr("name", f(o)),
                        o.autoFilter &&
                          (t("mergeCells", v).before(
                            x(v, "autoFilter", {
                              attr: {
                                ref: "A" + a + ":" + g(T.header.length - 1) + s,
                              },
                            })
                          ),
                          t("definedNames", j).append(
                            x(j, "definedName", {
                              attr: {
                                name: "_xlnm._FilterDatabase",
                                localSheetId: "0",
                                hidden: 1,
                              },
                              text:
                                f(o) +
                                "!$A$" +
                                a +
                                ":" +
                                g(T.header.length - 1) +
                                s,
                            })
                          )),
                        o.customize && o.customize(_, o, n),
                        0 === t("mergeCells", v).children().length &&
                          t("mergeCells", v).remove();
                      var E = new (c())(),
                        P = {
                          compression: "DEFLATE",
                          type: "blob",
                          mimeType:
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        };
                      y(E, _);
                      var B = A.filename;
                      B > 175 && (B = B.substr(0, 175)),
                        E.generateAsync
                          ? E.generateAsync(P).then(function (t) {
                              d(t, B), p.processing(!1);
                            })
                          : (d(E.generate(P), B), this.processing(!1));
                    },
                    filename: "*",
                    extension: ".xlsx",
                    exportOptions: {},
                    header: !0,
                    footer: !1,
                    title: "*",
                    messageTop: "*",
                    messageBottom: "*",
                    createEmptyCells: !1,
                    autoFilter: !1,
                    sheetName: "",
                  }),
                  (l.ext.buttons.pdfHtml5 = {
                    className: "buttons-pdf buttons-html5",
                    available: function () {
                      return e.FileReader !== i && u();
                    },
                    text: function (t) {
                      return t.i18n("buttons.pdf", "PDF");
                    },
                    action: function (e, n, r, o) {
                      this.processing(!0);
                      var a = n.buttons.exportData(o.exportOptions),
                        s = n.buttons.exportInfo(o),
                        l = [];
                      o.header &&
                        l.push(
                          t.map(a.header, function (t) {
                            return {
                              text: "string" == typeof t ? t : t + "",
                              style: "tableHeader",
                            };
                          })
                        );
                      for (var c = 0, d = a.body.length; c < d; c++)
                        l.push(
                          t.map(a.body[c], function (t) {
                            return (
                              (null !== t && t !== i) || (t = ""),
                              {
                                text: "string" == typeof t ? t : t + "",
                                style: c % 2 ? "tableBodyEven" : "tableBodyOdd",
                              }
                            );
                          })
                        );
                      o.footer &&
                        a.footer &&
                        l.push(
                          t.map(a.footer, function (t) {
                            return {
                              text: "string" == typeof t ? t : t + "",
                              style: "tableFooter",
                            };
                          })
                        );
                      var f = {
                        pageSize: o.pageSize,
                        pageOrientation: o.orientation,
                        content: [
                          {
                            table: { headerRows: 1, body: l },
                            layout: "noBorders",
                          },
                        ],
                        styles: {
                          tableHeader: {
                            bold: !0,
                            fontSize: 11,
                            color: "white",
                            fillColor: "#2d4154",
                            alignment: "center",
                          },
                          tableBodyEven: {},
                          tableBodyOdd: { fillColor: "#f3f3f3" },
                          tableFooter: {
                            bold: !0,
                            fontSize: 11,
                            color: "white",
                            fillColor: "#2d4154",
                          },
                          title: { alignment: "center", fontSize: 15 },
                          message: {},
                        },
                        defaultStyle: { fontSize: 10 },
                      };
                      s.messageTop &&
                        f.content.unshift({
                          text: s.messageTop,
                          style: "message",
                          margin: [0, 0, 0, 12],
                        }),
                        s.messageBottom &&
                          f.content.push({
                            text: s.messageBottom,
                            style: "message",
                            margin: [0, 0, 0, 12],
                          }),
                        s.title &&
                          f.content.unshift({
                            text: s.title,
                            style: "title",
                            margin: [0, 0, 0, 12],
                          }),
                        o.customize && o.customize(f, o, n);
                      var p = u().createPdf(f);
                      "open" !== o.download || m()
                        ? p.download(s.filename)
                        : p.open(),
                        this.processing(!1);
                    },
                    title: "*",
                    filename: "*",
                    extension: ".pdf",
                    exportOptions: {},
                    orientation: "portrait",
                    pageSize: "A4",
                    header: !0,
                    footer: !1,
                    messageTop: "*",
                    messageBottom: "*",
                    customize: null,
                    download: "download",
                  }),
                  l
                );
              })(t, window, document);
            }.apply(e, r)) || (t.exports = o);
      },
      7480: function (t, e, n) {
        var r, o;
        (r = [n(8942), n(991), n(8336)]),
          void 0 ===
            (o = function (t) {
              return (function (t, e, n, r) {
                "use strict";
                var o = t.fn.dataTable,
                  i = n.createElement("a"),
                  a = function (e) {
                    var n = t(e).clone()[0];
                    return (
                      "link" === n.nodeName.toLowerCase() &&
                        (n.href = s(n.href)),
                      n.outerHTML
                    );
                  },
                  s = function (t) {
                    i.href = t;
                    var e = i.host;
                    return (
                      -1 === e.indexOf("/") &&
                        0 !== i.pathname.indexOf("/") &&
                        (e += "/"),
                      i.protocol + "//" + e + i.pathname + i.search
                    );
                  };
                return (
                  (o.ext.buttons.print = {
                    className: "buttons-print",
                    text: function (t) {
                      return t.i18n("buttons.print", "Print");
                    },
                    action: function (n, o, i, l) {
                      var c = o.buttons.exportData(
                          t.extend({ decodeEntities: !1 }, l.exportOptions)
                        ),
                        u = o.buttons.exportInfo(l),
                        d = o
                          .columns(l.exportOptions.columns)
                          .flatten()
                          .map(function (t) {
                            return o.settings()[0].aoColumns[o.column(t).index()].sClass;
                          })
                          .toArray(),
                        f = function (t, e) {
                          for (
                            var n = "<tr>", o = 0, i = t.length;
                            o < i;
                            o++
                          ) {
                            var a = null === t[o] || t[o] === r ? "" : t[o];
                            n +=
                              "<" +
                              e +
                              " " +
                              (d[o] ? 'class="' + d[o] + '"' : "") +
                              ">" +
                              a +
                              "</" +
                              e +
                              ">";
                          }
                          return n + "</tr>";
                        },
                        p =
                          '<table class="' + o.table().node().className + '">';
                      l.header &&
                        (p += "<thead>" + f(c.header, "th") + "</thead>"),
                        (p += "<tbody>");
                      for (var h = 0, m = c.body.length; h < m; h++)
                        p += f(c.body[h], "td");
                      (p += "</tbody>"),
                        l.footer &&
                          c.footer &&
                          (p += "<tfoot>" + f(c.footer, "th") + "</tfoot>"),
                        (p += "</table>");
                      var g = e.open("", "");
                      if (g) {
                        g.document.close();
                        var v = "<title>" + u.title + "</title>";
                        t("style, link").each(function () {
                          v += a(this);
                        });
                        try {
                          g.document.head.innerHTML = v;
                        } catch (n) {
                          t(g.document.head).html(v);
                        }
                        (g.document.body.innerHTML =
                          "<h1>" +
                          u.title +
                          "</h1><div>" +
                          (u.messageTop || "") +
                          "</div>" +
                          p +
                          "<div>" +
                          (u.messageBottom || "") +
                          "</div>"),
                          t(g.document.body).addClass("dt-print-view"),
                          t("img", g.document.body).each(function (t, e) {
                            e.setAttribute("src", s(e.getAttribute("src")));
                          }),
                          l.customize && l.customize(g, l, o);
                        var b = function () {
                          l.autoPrint && (g.print(), g.close());
                        };
                        navigator.userAgent.match(/Trident\/\d.\d/)
                          ? b()
                          : g.setTimeout(b, 1e3);
                      } else
                        o.buttons.info(
                          o.i18n(
                            "buttons.printErrorTitle",
                            "Unable to open print view"
                          ),
                          o.i18n(
                            "buttons.printErrorMsg",
                            "Please allow popups in your browser for this site to be able to view the print view."
                          ),
                          5e3
                        );
                    },
                    title: "*",
                    messageTop: "*",
                    messageBottom: "*",
                    exportOptions: {},
                    header: !0,
                    footer: !1,
                    autoPrint: !0,
                    customize: null,
                  }),
                  o
                );
              })(t, window, document);
            }.apply(e, r)) || (t.exports = o);
      },
      8942: function (t, e, n) {
        var r = n(9755),
          o = n(7672);
        (o.$ = r), (o.jQuery = r), (t.exports = r);
      },
      7672: function (t, e, n) {
        "use strict";
        t.exports = (function () {
          if ("object" == typeof globalThis) return globalThis;
          var t;
          try {
            t = this || new Function("return this")();
          } catch (t) {
            if ("object" == typeof window) return window;
            if ("object" == typeof self) return self;
            if (void 0 !== n.g) return n.g;
          }
          return t;
        })();
      },
      9755: function (t, e) {
        var n;
        !(function (e, n) {
          "use strict";
          "object" == typeof t.exports
            ? (t.exports = e.document
                ? n(e, !0)
                : function (t) {
                    if (!t.document)
                      throw new Error(
                        "jQuery requires a window with a document"
                      );
                    return n(t);
                  })
            : n(e);
        })("undefined" != typeof window ? window : this, function (r, o) {
          "use strict";
          var i = [],
            a = Object.getPrototypeOf,
            s = i.slice,
            l = i.flat
              ? function (t) {
                  return i.flat.call(t);
                }
              : function (t) {
                  return i.concat.apply([], t);
                },
            c = i.push,
            u = i.indexOf,
            d = {},
            f = d.toString,
            p = d.hasOwnProperty,
            h = p.toString,
            m = h.call(Object),
            g = {},
            v = function (t) {
              return (
                "function" == typeof t &&
                "number" != typeof t.nodeType &&
                "function" != typeof t.item
              );
            },
            b = function (t) {
              return null != t && t === t.window;
            },
            y = r.document,
            x = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function w(t, e, n) {
            var r,
              o,
              i = (n = n || y).createElement("script");
            if (((i.text = t), e))
              for (r in x)
                (o = e[r] || (e.getAttribute && e.getAttribute(r))) &&
                  i.setAttribute(r, o);
            n.head.appendChild(i).parentNode.removeChild(i);
          }
          function S(t) {
            return null == t
              ? t + ""
              : "object" == typeof t || "function" == typeof t
              ? d[f.call(t)] || "object"
              : typeof t;
          }
          var C = "3.7.0",
            _ = /HTML$/i,
            T = function (t, e) {
              return new T.fn.init(t, e);
            };
          function D(t) {
            var e = !!t && "length" in t && t.length,
              n = S(t);
            return (
              !v(t) &&
              !b(t) &&
              ("array" === n ||
                0 === e ||
                ("number" == typeof e && e > 0 && e - 1 in t))
            );
          }
          function I(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
          }
          (T.fn = T.prototype =
            {
              jquery: C,
              constructor: T,
              length: 0,
              toArray: function () {
                return s.call(this);
              },
              get: function (t) {
                return null == t
                  ? s.call(this)
                  : t < 0
                  ? this[t + this.length]
                  : this[t];
              },
              pushStack: function (t) {
                var e = T.merge(this.constructor(), t);
                return (e.prevObject = this), e;
              },
              each: function (t) {
                return T.each(this, t);
              },
              map: function (t) {
                return this.pushStack(
                  T.map(this, function (e, n) {
                    return t.call(e, n, e);
                  })
                );
              },
              slice: function () {
                return this.pushStack(s.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  T.grep(this, function (t, e) {
                    return (e + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  T.grep(this, function (t, e) {
                    return e % 2;
                  })
                );
              },
              eq: function (t) {
                var e = this.length,
                  n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: c,
              sort: i.sort,
              splice: i.splice,
            }),
            (T.extend = T.fn.extend =
              function () {
                var t,
                  e,
                  n,
                  r,
                  o,
                  i,
                  a = arguments[0] || {},
                  s = 1,
                  l = arguments.length,
                  c = !1;
                for (
                  "boolean" == typeof a &&
                    ((c = a), (a = arguments[s] || {}), s++),
                    "object" == typeof a || v(a) || (a = {}),
                    s === l && ((a = this), s--);
                  s < l;
                  s++
                )
                  if (null != (t = arguments[s]))
                    for (e in t)
                      (r = t[e]),
                        "__proto__" !== e &&
                          a !== r &&
                          (c &&
                          r &&
                          (T.isPlainObject(r) || (o = Array.isArray(r)))
                            ? ((n = a[e]),
                              (i =
                                o && !Array.isArray(n)
                                  ? []
                                  : o || T.isPlainObject(n)
                                  ? n
                                  : {}),
                              (o = !1),
                              (a[e] = T.extend(c, i, r)))
                            : void 0 !== r && (a[e] = r));
                return a;
              }),
            T.extend({
              expando: "jQuery" + (C + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (t) {
                throw new Error(t);
              },
              noop: function () {},
              isPlainObject: function (t) {
                var e, n;
                return (
                  !(!t || "[object Object]" !== f.call(t)) &&
                  (!(e = a(t)) ||
                    ("function" ==
                      typeof (n = p.call(e, "constructor") && e.constructor) &&
                      h.call(n) === m))
                );
              },
              isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
              },
              globalEval: function (t, e, n) {
                w(t, { nonce: e && e.nonce }, n);
              },
              each: function (t, e) {
                var n,
                  r = 0;
                if (D(t))
                  for (
                    n = t.length;
                    r < n && !1 !== e.call(t[r], r, t[r]);
                    r++
                  );
                else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
                return t;
              },
              text: function (t) {
                var e,
                  n = "",
                  r = 0,
                  o = t.nodeType;
                if (o) {
                  if (1 === o || 9 === o || 11 === o) return t.textContent;
                  if (3 === o || 4 === o) return t.nodeValue;
                } else for (; (e = t[r++]); ) n += T.text(e);
                return n;
              },
              makeArray: function (t, e) {
                var n = e || [];
                return (
                  null != t &&
                    (D(Object(t))
                      ? T.merge(n, "string" == typeof t ? [t] : t)
                      : c.call(n, t)),
                  n
                );
              },
              inArray: function (t, e, n) {
                return null == e ? -1 : u.call(e, t, n);
              },
              isXMLDoc: function (t) {
                var e = t && t.namespaceURI,
                  n = t && (t.ownerDocument || t).documentElement;
                return !_.test(e || (n && n.nodeName) || "HTML");
              },
              merge: function (t, e) {
                for (var n = +e.length, r = 0, o = t.length; r < n; r++)
                  t[o++] = e[r];
                return (t.length = o), t;
              },
              grep: function (t, e, n) {
                for (var r = [], o = 0, i = t.length, a = !n; o < i; o++)
                  !e(t[o], o) !== a && r.push(t[o]);
                return r;
              },
              map: function (t, e, n) {
                var r,
                  o,
                  i = 0,
                  a = [];
                if (D(t))
                  for (r = t.length; i < r; i++)
                    null != (o = e(t[i], i, n)) && a.push(o);
                else for (i in t) null != (o = e(t[i], i, n)) && a.push(o);
                return l(a);
              },
              guid: 1,
              support: g,
            }),
            "function" == typeof Symbol &&
              (T.fn[Symbol.iterator] = i[Symbol.iterator]),
            T.each(
              "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
              ),
              function (t, e) {
                d["[object " + e + "]"] = e.toLowerCase();
              }
            );
          var A = i.pop,
            F = i.sort,
            k = i.splice,
            N = "[\\x20\\t\\r\\n\\f]",
            L = new RegExp(
              "^" + N + "+|((?:^|[^\\\\])(?:\\\\.)*)" + N + "+$",
              "g"
            );
          T.contains = function (t, e) {
            var n = e && e.parentNode;
            return (
              t === n ||
              !(
                !n ||
                1 !== n.nodeType ||
                !(t.contains
                  ? t.contains(n)
                  : t.compareDocumentPosition &&
                    16 & t.compareDocumentPosition(n))
              )
            );
          };
          var H = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
          function j(t, e) {
            return e
              ? "\0" === t
                ? "�"
                : t.slice(0, -1) +
                  "\\" +
                  t.charCodeAt(t.length - 1).toString(16) +
                  " "
              : "\\" + t;
          }
          T.escapeSelector = function (t) {
            return (t + "").replace(H, j);
          };
          var E = y,
            P = c;
          !(function () {
            var t,
              e,
              n,
              o,
              a,
              l,
              c,
              d,
              f,
              h,
              m = P,
              v = T.expando,
              b = 0,
              y = 0,
              x = tt(),
              w = tt(),
              S = tt(),
              C = tt(),
              _ = function (t, e) {
                return t === e && (a = !0), 0;
              },
              D =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              H =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                N +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              j =
                "\\[" +
                N +
                "*(" +
                H +
                ")(?:" +
                N +
                "*([*^$|!~]?=)" +
                N +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                H +
                "))|)" +
                N +
                "*\\]",
              B =
                ":(" +
                H +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                j +
                ")*)|.*)\\)|)",
              O = new RegExp(N + "+", "g"),
              R = new RegExp("^" + N + "*," + N + "*"),
              M = new RegExp("^" + N + "*([>+~]|" + N + ")" + N + "*"),
              W = new RegExp(N + "|>"),
              q = new RegExp(B),
              z = new RegExp("^" + H + "$"),
              $ = {
                ID: new RegExp("^#(" + H + ")"),
                CLASS: new RegExp("^\\.(" + H + ")"),
                TAG: new RegExp("^(" + H + "|[*])"),
                ATTR: new RegExp("^" + j),
                PSEUDO: new RegExp("^" + B),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    N +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    N +
                    "*(?:([+-]|)" +
                    N +
                    "*(\\d+)|))" +
                    N +
                    "*\\)|)",
                  "i"
                ),
                bool: new RegExp("^(?:" + D + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    N +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    N +
                    "*((?:-\\d)?\\d*)" +
                    N +
                    "*\\)|)(?=[^-]|$)",
                  "i"
                ),
              },
              U = /^(?:input|select|textarea|button)$/i,
              X = /^h\d$/i,
              V = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              J = /[+~]/,
              K = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + N + "?|\\\\([^\\r\\n\\f])",
                "g"
              ),
              G = function (t, e) {
                var n = "0x" + t.slice(1) - 65536;
                return (
                  e ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              Y = function () {
                lt();
              },
              Z = ft(
                function (t) {
                  return !0 === t.disabled && I(t, "fieldset");
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              m.apply((i = s.call(E.childNodes)), E.childNodes),
                i[E.childNodes.length].nodeType;
            } catch (t) {
              m = {
                apply: function (t, e) {
                  P.apply(t, s.call(e));
                },
                call: function (t) {
                  P.apply(t, s.call(arguments, 1));
                },
              };
            }
            function Q(t, e, n, r) {
              var o,
                i,
                a,
                s,
                c,
                u,
                p,
                h = e && e.ownerDocument,
                b = e ? e.nodeType : 9;
              if (
                ((n = n || []),
                "string" != typeof t || !t || (1 !== b && 9 !== b && 11 !== b))
              )
                return n;
              if (!r && (lt(e), (e = e || l), d)) {
                if (11 !== b && (c = V.exec(t)))
                  if ((o = c[1])) {
                    if (9 === b) {
                      if (!(a = e.getElementById(o))) return n;
                      if (a.id === o) return m.call(n, a), n;
                    } else if (
                      h &&
                      (a = h.getElementById(o)) &&
                      Q.contains(e, a) &&
                      a.id === o
                    )
                      return m.call(n, a), n;
                  } else {
                    if (c[2]) return m.apply(n, e.getElementsByTagName(t)), n;
                    if ((o = c[3]) && e.getElementsByClassName)
                      return m.apply(n, e.getElementsByClassName(o)), n;
                  }
                if (!(C[t + " "] || (f && f.test(t)))) {
                  if (((p = t), (h = e), 1 === b && (W.test(t) || M.test(t)))) {
                    for (
                      ((h = (J.test(t) && st(e.parentNode)) || e) == e &&
                        g.scope) ||
                        ((s = e.getAttribute("id"))
                          ? (s = T.escapeSelector(s))
                          : e.setAttribute("id", (s = v))),
                        i = (u = ut(t)).length;
                      i--;

                    )
                      u[i] = (s ? "#" + s : ":scope") + " " + dt(u[i]);
                    p = u.join(",");
                  }
                  try {
                    return m.apply(n, h.querySelectorAll(p)), n;
                  } catch (e) {
                    C(t, !0);
                  } finally {
                    s === v && e.removeAttribute("id");
                  }
                }
              }
              return bt(t.replace(L, "$1"), e, n, r);
            }
            function tt() {
              var t = [];
              return function n(r, o) {
                return (
                  t.push(r + " ") > e.cacheLength && delete n[t.shift()],
                  (n[r + " "] = o)
                );
              };
            }
            function et(t) {
              return (t[v] = !0), t;
            }
            function nt(t) {
              var e = l.createElement("fieldset");
              try {
                return !!t(e);
              } catch (t) {
                return !1;
              } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
              }
            }
            function rt(t) {
              return function (e) {
                return I(e, "input") && e.type === t;
              };
            }
            function ot(t) {
              return function (e) {
                return (I(e, "input") || I(e, "button")) && e.type === t;
              };
            }
            function it(t) {
              return function (e) {
                return "form" in e
                  ? e.parentNode && !1 === e.disabled
                    ? "label" in e
                      ? "label" in e.parentNode
                        ? e.parentNode.disabled === t
                        : e.disabled === t
                      : e.isDisabled === t ||
                        (e.isDisabled !== !t && Z(e) === t)
                    : e.disabled === t
                  : "label" in e && e.disabled === t;
              };
            }
            function at(t) {
              return et(function (e) {
                return (
                  (e = +e),
                  et(function (n, r) {
                    for (var o, i = t([], n.length, e), a = i.length; a--; )
                      n[(o = i[a])] && (n[o] = !(r[o] = n[o]));
                  })
                );
              });
            }
            function st(t) {
              return t && void 0 !== t.getElementsByTagName && t;
            }
            function lt(t) {
              var n,
                r = t ? t.ownerDocument || t : E;
              return r != l && 9 === r.nodeType && r.documentElement
                ? ((c = (l = r).documentElement),
                  (d = !T.isXMLDoc(l)),
                  (h =
                    c.matches ||
                    c.webkitMatchesSelector ||
                    c.msMatchesSelector),
                  E != l &&
                    (n = l.defaultView) &&
                    n.top !== n &&
                    n.addEventListener("unload", Y),
                  (g.getById = nt(function (t) {
                    return (
                      (c.appendChild(t).id = T.expando),
                      !l.getElementsByName ||
                        !l.getElementsByName(T.expando).length
                    );
                  })),
                  (g.disconnectedMatch = nt(function (t) {
                    return h.call(t, "*");
                  })),
                  (g.scope = nt(function () {
                    return l.querySelectorAll(":scope");
                  })),
                  (g.cssHas = nt(function () {
                    try {
                      return l.querySelector(":has(*,:jqfake)"), !1;
                    } catch (t) {
                      return !0;
                    }
                  })),
                  g.getById
                    ? ((e.filter.ID = function (t) {
                        var e = t.replace(K, G);
                        return function (t) {
                          return t.getAttribute("id") === e;
                        };
                      }),
                      (e.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && d) {
                          var n = e.getElementById(t);
                          return n ? [n] : [];
                        }
                      }))
                    : ((e.filter.ID = function (t) {
                        var e = t.replace(K, G);
                        return function (t) {
                          var n =
                            void 0 !== t.getAttributeNode &&
                            t.getAttributeNode("id");
                          return n && n.value === e;
                        };
                      }),
                      (e.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && d) {
                          var n,
                            r,
                            o,
                            i = e.getElementById(t);
                          if (i) {
                            if ((n = i.getAttributeNode("id")) && n.value === t)
                              return [i];
                            for (
                              o = e.getElementsByName(t), r = 0;
                              (i = o[r++]);

                            )
                              if (
                                (n = i.getAttributeNode("id")) &&
                                n.value === t
                              )
                                return [i];
                          }
                          return [];
                        }
                      })),
                  (e.find.TAG = function (t, e) {
                    return void 0 !== e.getElementsByTagName
                      ? e.getElementsByTagName(t)
                      : e.querySelectorAll(t);
                  }),
                  (e.find.CLASS = function (t, e) {
                    if (void 0 !== e.getElementsByClassName && d)
                      return e.getElementsByClassName(t);
                  }),
                  (f = []),
                  nt(function (t) {
                    var e;
                    (c.appendChild(t).innerHTML =
                      "<a id='" +
                      v +
                      "' href='' disabled='disabled'></a><select id='" +
                      v +
                      "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                      t.querySelectorAll("[selected]").length ||
                        f.push("\\[" + N + "*(?:value|" + D + ")"),
                      t.querySelectorAll("[id~=" + v + "-]").length ||
                        f.push("~="),
                      t.querySelectorAll("a#" + v + "+*").length ||
                        f.push(".#.+[+~]"),
                      t.querySelectorAll(":checked").length ||
                        f.push(":checked"),
                      (e = l.createElement("input")).setAttribute(
                        "type",
                        "hidden"
                      ),
                      t.appendChild(e).setAttribute("name", "D"),
                      (c.appendChild(t).disabled = !0),
                      2 !== t.querySelectorAll(":disabled").length &&
                        f.push(":enabled", ":disabled"),
                      (e = l.createElement("input")).setAttribute("name", ""),
                      t.appendChild(e),
                      t.querySelectorAll("[name='']").length ||
                        f.push(
                          "\\[" + N + "*name" + N + "*=" + N + "*(?:''|\"\")"
                        );
                  }),
                  g.cssHas || f.push(":has"),
                  (f = f.length && new RegExp(f.join("|"))),
                  (_ = function (t, e) {
                    if (t === e) return (a = !0), 0;
                    var n =
                      !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return (
                      n ||
                      (1 &
                        (n =
                          (t.ownerDocument || t) == (e.ownerDocument || e)
                            ? t.compareDocumentPosition(e)
                            : 1) ||
                      (!g.sortDetached && e.compareDocumentPosition(t) === n)
                        ? t === l || (t.ownerDocument == E && Q.contains(E, t))
                          ? -1
                          : e === l ||
                            (e.ownerDocument == E && Q.contains(E, e))
                          ? 1
                          : o
                          ? u.call(o, t) - u.call(o, e)
                          : 0
                        : 4 & n
                        ? -1
                        : 1)
                    );
                  }),
                  l)
                : l;
            }
            for (t in ((Q.matches = function (t, e) {
              return Q(t, null, null, e);
            }),
            (Q.matchesSelector = function (t, e) {
              if ((lt(t), d && !C[e + " "] && (!f || !f.test(e))))
                try {
                  var n = h.call(t, e);
                  if (
                    n ||
                    g.disconnectedMatch ||
                    (t.document && 11 !== t.document.nodeType)
                  )
                    return n;
                } catch (t) {
                  C(e, !0);
                }
              return Q(e, l, null, [t]).length > 0;
            }),
            (Q.contains = function (t, e) {
              return (t.ownerDocument || t) != l && lt(t), T.contains(t, e);
            }),
            (Q.attr = function (t, n) {
              (t.ownerDocument || t) != l && lt(t);
              var r = e.attrHandle[n.toLowerCase()],
                o =
                  r && p.call(e.attrHandle, n.toLowerCase())
                    ? r(t, n, !d)
                    : void 0;
              return void 0 !== o ? o : t.getAttribute(n);
            }),
            (Q.error = function (t) {
              throw new Error("Syntax error, unrecognized expression: " + t);
            }),
            (T.uniqueSort = function (t) {
              var e,
                n = [],
                r = 0,
                i = 0;
              if (
                ((a = !g.sortStable),
                (o = !g.sortStable && s.call(t, 0)),
                F.call(t, _),
                a)
              ) {
                for (; (e = t[i++]); ) e === t[i] && (r = n.push(i));
                for (; r--; ) k.call(t, n[r], 1);
              }
              return (o = null), t;
            }),
            (T.fn.uniqueSort = function () {
              return this.pushStack(T.uniqueSort(s.apply(this)));
            }),
            (e = T.expr =
              {
                cacheLength: 50,
                createPseudo: et,
                match: $,
                attrHandle: {},
                find: {},
                relative: {
                  ">": { dir: "parentNode", first: !0 },
                  " ": { dir: "parentNode" },
                  "+": { dir: "previousSibling", first: !0 },
                  "~": { dir: "previousSibling" },
                },
                preFilter: {
                  ATTR: function (t) {
                    return (
                      (t[1] = t[1].replace(K, G)),
                      (t[3] = (t[3] || t[4] || t[5] || "").replace(K, G)),
                      "~=" === t[2] && (t[3] = " " + t[3] + " "),
                      t.slice(0, 4)
                    );
                  },
                  CHILD: function (t) {
                    return (
                      (t[1] = t[1].toLowerCase()),
                      "nth" === t[1].slice(0, 3)
                        ? (t[3] || Q.error(t[0]),
                          (t[4] = +(t[4]
                            ? t[5] + (t[6] || 1)
                            : 2 * ("even" === t[3] || "odd" === t[3]))),
                          (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                        : t[3] && Q.error(t[0]),
                      t
                    );
                  },
                  PSEUDO: function (t) {
                    var e,
                      n = !t[6] && t[2];
                    return $.CHILD.test(t[0])
                      ? null
                      : (t[3]
                          ? (t[2] = t[4] || t[5] || "")
                          : n &&
                            q.test(n) &&
                            (e = ut(n, !0)) &&
                            (e = n.indexOf(")", n.length - e) - n.length) &&
                            ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                        t.slice(0, 3));
                  },
                },
                filter: {
                  TAG: function (t) {
                    var e = t.replace(K, G).toLowerCase();
                    return "*" === t
                      ? function () {
                          return !0;
                        }
                      : function (t) {
                          return I(t, e);
                        };
                  },
                  CLASS: function (t) {
                    var e = x[t + " "];
                    return (
                      e ||
                      ((e = new RegExp(
                        "(^|" + N + ")" + t + "(" + N + "|$)"
                      )) &&
                        x(t, function (t) {
                          return e.test(
                            ("string" == typeof t.className && t.className) ||
                              (void 0 !== t.getAttribute &&
                                t.getAttribute("class")) ||
                              ""
                          );
                        }))
                    );
                  },
                  ATTR: function (t, e, n) {
                    return function (r) {
                      var o = Q.attr(r, t);
                      return null == o
                        ? "!=" === e
                        : !e ||
                            ((o += ""),
                            "=" === e
                              ? o === n
                              : "!=" === e
                              ? o !== n
                              : "^=" === e
                              ? n && 0 === o.indexOf(n)
                              : "*=" === e
                              ? n && o.indexOf(n) > -1
                              : "$=" === e
                              ? n && o.slice(-n.length) === n
                              : "~=" === e
                              ? (" " + o.replace(O, " ") + " ").indexOf(n) > -1
                              : "|=" === e &&
                                (o === n ||
                                  o.slice(0, n.length + 1) === n + "-"));
                    };
                  },
                  CHILD: function (t, e, n, r, o) {
                    var i = "nth" !== t.slice(0, 3),
                      a = "last" !== t.slice(-4),
                      s = "of-type" === e;
                    return 1 === r && 0 === o
                      ? function (t) {
                          return !!t.parentNode;
                        }
                      : function (e, n, l) {
                          var c,
                            u,
                            d,
                            f,
                            p,
                            h = i !== a ? "nextSibling" : "previousSibling",
                            m = e.parentNode,
                            g = s && e.nodeName.toLowerCase(),
                            y = !l && !s,
                            x = !1;
                          if (m) {
                            if (i) {
                              for (; h; ) {
                                for (d = e; (d = d[h]); )
                                  if (s ? I(d, g) : 1 === d.nodeType) return !1;
                                p = h = "only" === t && !p && "nextSibling";
                              }
                              return !0;
                            }
                            if (
                              ((p = [a ? m.firstChild : m.lastChild]), a && y)
                            ) {
                              for (
                                x =
                                  (f =
                                    (c =
                                      (u = m[v] || (m[v] = {}))[t] || [])[0] ===
                                      b && c[1]) && c[2],
                                  d = f && m.childNodes[f];
                                (d =
                                  (++f && d && d[h]) || (x = f = 0) || p.pop());

                              )
                                if (1 === d.nodeType && ++x && d === e) {
                                  u[t] = [b, f, x];
                                  break;
                                }
                            } else if (
                              (y &&
                                (x = f =
                                  (c =
                                    (u = e[v] || (e[v] = {}))[t] || [])[0] ===
                                    b && c[1]),
                              !1 === x)
                            )
                              for (
                                ;
                                (d =
                                  (++f && d && d[h]) ||
                                  (x = f = 0) ||
                                  p.pop()) &&
                                (!(s ? I(d, g) : 1 === d.nodeType) ||
                                  !++x ||
                                  (y && ((u = d[v] || (d[v] = {}))[t] = [b, x]),
                                  d !== e));

                              );
                            return (x -= o) === r || (x % r == 0 && x / r >= 0);
                          }
                        };
                  },
                  PSEUDO: function (t, n) {
                    var r,
                      o =
                        e.pseudos[t] ||
                        e.setFilters[t.toLowerCase()] ||
                        Q.error("unsupported pseudo: " + t);
                    return o[v]
                      ? o(n)
                      : o.length > 1
                      ? ((r = [t, t, "", n]),
                        e.setFilters.hasOwnProperty(t.toLowerCase())
                          ? et(function (t, e) {
                              for (var r, i = o(t, n), a = i.length; a--; )
                                t[(r = u.call(t, i[a]))] = !(e[r] = i[a]);
                            })
                          : function (t) {
                              return o(t, 0, r);
                            })
                      : o;
                  },
                },
                pseudos: {
                  not: et(function (t) {
                    var e = [],
                      n = [],
                      r = vt(t.replace(L, "$1"));
                    return r[v]
                      ? et(function (t, e, n, o) {
                          for (
                            var i, a = r(t, null, o, []), s = t.length;
                            s--;

                          )
                            (i = a[s]) && (t[s] = !(e[s] = i));
                        })
                      : function (t, o, i) {
                          return (
                            (e[0] = t),
                            r(e, null, i, n),
                            (e[0] = null),
                            !n.pop()
                          );
                        };
                  }),
                  has: et(function (t) {
                    return function (e) {
                      return Q(t, e).length > 0;
                    };
                  }),
                  contains: et(function (t) {
                    return (
                      (t = t.replace(K, G)),
                      function (e) {
                        return (e.textContent || T.text(e)).indexOf(t) > -1;
                      }
                    );
                  }),
                  lang: et(function (t) {
                    return (
                      z.test(t || "") || Q.error("unsupported lang: " + t),
                      (t = t.replace(K, G).toLowerCase()),
                      function (e) {
                        var n;
                        do {
                          if (
                            (n = d
                              ? e.lang
                              : e.getAttribute("xml:lang") ||
                                e.getAttribute("lang"))
                          )
                            return (
                              (n = n.toLowerCase()) === t ||
                              0 === n.indexOf(t + "-")
                            );
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1;
                      }
                    );
                  }),
                  target: function (t) {
                    var e = r.location && r.location.hash;
                    return e && e.slice(1) === t.id;
                  },
                  root: function (t) {
                    return t === c;
                  },
                  focus: function (t) {
                    return (
                      t ===
                        (function () {
                          try {
                            return l.activeElement;
                          } catch (t) {}
                        })() &&
                      l.hasFocus() &&
                      !!(t.type || t.href || ~t.tabIndex)
                    );
                  },
                  enabled: it(!1),
                  disabled: it(!0),
                  checked: function (t) {
                    return (
                      (I(t, "input") && !!t.checked) ||
                      (I(t, "option") && !!t.selected)
                    );
                  },
                  selected: function (t) {
                    return (
                      t.parentNode && t.parentNode.selectedIndex,
                      !0 === t.selected
                    );
                  },
                  empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                      if (t.nodeType < 6) return !1;
                    return !0;
                  },
                  parent: function (t) {
                    return !e.pseudos.empty(t);
                  },
                  header: function (t) {
                    return X.test(t.nodeName);
                  },
                  input: function (t) {
                    return U.test(t.nodeName);
                  },
                  button: function (t) {
                    return (
                      (I(t, "input") && "button" === t.type) || I(t, "button")
                    );
                  },
                  text: function (t) {
                    var e;
                    return (
                      I(t, "input") &&
                      "text" === t.type &&
                      (null == (e = t.getAttribute("type")) ||
                        "text" === e.toLowerCase())
                    );
                  },
                  first: at(function () {
                    return [0];
                  }),
                  last: at(function (t, e) {
                    return [e - 1];
                  }),
                  eq: at(function (t, e, n) {
                    return [n < 0 ? n + e : n];
                  }),
                  even: at(function (t, e) {
                    for (var n = 0; n < e; n += 2) t.push(n);
                    return t;
                  }),
                  odd: at(function (t, e) {
                    for (var n = 1; n < e; n += 2) t.push(n);
                    return t;
                  }),
                  lt: at(function (t, e, n) {
                    var r;
                    for (r = n < 0 ? n + e : n > e ? e : n; --r >= 0; )
                      t.push(r);
                    return t;
                  }),
                  gt: at(function (t, e, n) {
                    for (var r = n < 0 ? n + e : n; ++r < e; ) t.push(r);
                    return t;
                  }),
                },
              }),
            (e.pseudos.nth = e.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              e.pseudos[t] = rt(t);
            for (t in { submit: !0, reset: !0 }) e.pseudos[t] = ot(t);
            function ct() {}
            function ut(t, n) {
              var r,
                o,
                i,
                a,
                s,
                l,
                c,
                u = w[t + " "];
              if (u) return n ? 0 : u.slice(0);
              for (s = t, l = [], c = e.preFilter; s; ) {
                for (a in ((r && !(o = R.exec(s))) ||
                  (o && (s = s.slice(o[0].length) || s), l.push((i = []))),
                (r = !1),
                (o = M.exec(s)) &&
                  ((r = o.shift()),
                  i.push({ value: r, type: o[0].replace(L, " ") }),
                  (s = s.slice(r.length))),
                e.filter))
                  !(o = $[a].exec(s)) ||
                    (c[a] && !(o = c[a](o))) ||
                    ((r = o.shift()),
                    i.push({ value: r, type: a, matches: o }),
                    (s = s.slice(r.length)));
                if (!r) break;
              }
              return n ? s.length : s ? Q.error(t) : w(t, l).slice(0);
            }
            function dt(t) {
              for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
              return r;
            }
            function ft(t, e, n) {
              var r = e.dir,
                o = e.next,
                i = o || r,
                a = n && "parentNode" === i,
                s = y++;
              return e.first
                ? function (e, n, o) {
                    for (; (e = e[r]); )
                      if (1 === e.nodeType || a) return t(e, n, o);
                    return !1;
                  }
                : function (e, n, l) {
                    var c,
                      u,
                      d = [b, s];
                    if (l) {
                      for (; (e = e[r]); )
                        if ((1 === e.nodeType || a) && t(e, n, l)) return !0;
                    } else
                      for (; (e = e[r]); )
                        if (1 === e.nodeType || a)
                          if (((u = e[v] || (e[v] = {})), o && I(e, o)))
                            e = e[r] || e;
                          else {
                            if ((c = u[i]) && c[0] === b && c[1] === s)
                              return (d[2] = c[2]);
                            if (((u[i] = d), (d[2] = t(e, n, l)))) return !0;
                          }
                    return !1;
                  };
            }
            function pt(t) {
              return t.length > 1
                ? function (e, n, r) {
                    for (var o = t.length; o--; ) if (!t[o](e, n, r)) return !1;
                    return !0;
                  }
                : t[0];
            }
            function ht(t, e, n, r, o) {
              for (
                var i, a = [], s = 0, l = t.length, c = null != e;
                s < l;
                s++
              )
                (i = t[s]) &&
                  ((n && !n(i, r, o)) || (a.push(i), c && e.push(s)));
              return a;
            }
            function mt(t, e, n, r, o, i) {
              return (
                r && !r[v] && (r = mt(r)),
                o && !o[v] && (o = mt(o, i)),
                et(function (i, a, s, l) {
                  var c,
                    d,
                    f,
                    p,
                    h = [],
                    g = [],
                    v = a.length,
                    b =
                      i ||
                      (function (t, e, n) {
                        for (var r = 0, o = e.length; r < o; r++) Q(t, e[r], n);
                        return n;
                      })(e || "*", s.nodeType ? [s] : s, []),
                    y = !t || (!i && e) ? b : ht(b, h, t, s, l);
                  if (
                    (n
                      ? n(y, (p = o || (i ? t : v || r) ? [] : a), s, l)
                      : (p = y),
                    r)
                  )
                    for (c = ht(p, g), r(c, [], s, l), d = c.length; d--; )
                      (f = c[d]) && (p[g[d]] = !(y[g[d]] = f));
                  if (i) {
                    if (o || t) {
                      if (o) {
                        for (c = [], d = p.length; d--; )
                          (f = p[d]) && c.push((y[d] = f));
                        o(null, (p = []), c, l);
                      }
                      for (d = p.length; d--; )
                        (f = p[d]) &&
                          (c = o ? u.call(i, f) : h[d]) > -1 &&
                          (i[c] = !(a[c] = f));
                    }
                  } else (p = ht(p === a ? p.splice(v, p.length) : p)), o ? o(null, a, p, l) : m.apply(a, p);
                })
              );
            }
            function gt(t) {
              for (
                var r,
                  o,
                  i,
                  a = t.length,
                  s = e.relative[t[0].type],
                  l = s || e.relative[" "],
                  c = s ? 1 : 0,
                  d = ft(
                    function (t) {
                      return t === r;
                    },
                    l,
                    !0
                  ),
                  f = ft(
                    function (t) {
                      return u.call(r, t) > -1;
                    },
                    l,
                    !0
                  ),
                  p = [
                    function (t, e, o) {
                      var i =
                        (!s && (o || e != n)) ||
                        ((r = e).nodeType ? d(t, e, o) : f(t, e, o));
                      return (r = null), i;
                    },
                  ];
                c < a;
                c++
              )
                if ((o = e.relative[t[c].type])) p = [ft(pt(p), o)];
                else {
                  if ((o = e.filter[t[c].type].apply(null, t[c].matches))[v]) {
                    for (i = ++c; i < a && !e.relative[t[i].type]; i++);
                    return mt(
                      c > 1 && pt(p),
                      c > 1 &&
                        dt(
                          t
                            .slice(0, c - 1)
                            .concat({ value: " " === t[c - 2].type ? "*" : "" })
                        ).replace(L, "$1"),
                      o,
                      c < i && gt(t.slice(c, i)),
                      i < a && gt((t = t.slice(i))),
                      i < a && dt(t)
                    );
                  }
                  p.push(o);
                }
              return pt(p);
            }
            function vt(t, r) {
              var o,
                i = [],
                a = [],
                s = S[t + " "];
              if (!s) {
                for (r || (r = ut(t)), o = r.length; o--; )
                  (s = gt(r[o]))[v] ? i.push(s) : a.push(s);
                (s = S(
                  t,
                  (function (t, r) {
                    var o = r.length > 0,
                      i = t.length > 0,
                      a = function (a, s, c, u, f) {
                        var p,
                          h,
                          g,
                          v = 0,
                          y = "0",
                          x = a && [],
                          w = [],
                          S = n,
                          C = a || (i && e.find.TAG("*", f)),
                          _ = (b += null == S ? 1 : Math.random() || 0.1),
                          D = C.length;
                        for (
                          f && (n = s == l || s || f);
                          y !== D && null != (p = C[y]);
                          y++
                        ) {
                          if (i && p) {
                            for (
                              h = 0,
                                s || p.ownerDocument == l || (lt(p), (c = !d));
                              (g = t[h++]);

                            )
                              if (g(p, s || l, c)) {
                                m.call(u, p);
                                break;
                              }
                            f && (b = _);
                          }
                          o && ((p = !g && p) && v--, a && x.push(p));
                        }
                        if (((v += y), o && y !== v)) {
                          for (h = 0; (g = r[h++]); ) g(x, w, s, c);
                          if (a) {
                            if (v > 0)
                              for (; y--; ) x[y] || w[y] || (w[y] = A.call(u));
                            w = ht(w);
                          }
                          m.apply(u, w),
                            f &&
                              !a &&
                              w.length > 0 &&
                              v + r.length > 1 &&
                              T.uniqueSort(u);
                        }
                        return f && ((b = _), (n = S)), x;
                      };
                    return o ? et(a) : a;
                  })(a, i)
                )),
                  (s.selector = t);
              }
              return s;
            }
            function bt(t, n, r, o) {
              var i,
                a,
                s,
                l,
                c,
                u = "function" == typeof t && t,
                f = !o && ut((t = u.selector || t));
              if (((r = r || []), 1 === f.length)) {
                if (
                  (a = f[0] = f[0].slice(0)).length > 2 &&
                  "ID" === (s = a[0]).type &&
                  9 === n.nodeType &&
                  d &&
                  e.relative[a[1].type]
                ) {
                  if (
                    !(n = (e.find.ID(s.matches[0].replace(K, G), n) || [])[0])
                  )
                    return r;
                  u && (n = n.parentNode),
                    (t = t.slice(a.shift().value.length));
                }
                for (
                  i = $.needsContext.test(t) ? 0 : a.length;
                  i-- && ((s = a[i]), !e.relative[(l = s.type)]);

                )
                  if (
                    (c = e.find[l]) &&
                    (o = c(
                      s.matches[0].replace(K, G),
                      (J.test(a[0].type) && st(n.parentNode)) || n
                    ))
                  ) {
                    if ((a.splice(i, 1), !(t = o.length && dt(a))))
                      return m.apply(r, o), r;
                    break;
                  }
              }
              return (
                (u || vt(t, f))(
                  o,
                  n,
                  !d,
                  r,
                  !n || (J.test(t) && st(n.parentNode)) || n
                ),
                r
              );
            }
            (ct.prototype = e.filters = e.pseudos),
              (e.setFilters = new ct()),
              (g.sortStable = v.split("").sort(_).join("") === v),
              lt(),
              (g.sortDetached = nt(function (t) {
                return (
                  1 & t.compareDocumentPosition(l.createElement("fieldset"))
                );
              })),
              (T.find = Q),
              (T.expr[":"] = T.expr.pseudos),
              (T.unique = T.uniqueSort),
              (Q.compile = vt),
              (Q.select = bt),
              (Q.setDocument = lt),
              (Q.escape = T.escapeSelector),
              (Q.getText = T.text),
              (Q.isXML = T.isXMLDoc),
              (Q.selectors = T.expr),
              (Q.support = T.support),
              (Q.uniqueSort = T.uniqueSort);
          })();
          var B = function (t, e, n) {
              for (
                var r = [], o = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;

              )
                if (1 === t.nodeType) {
                  if (o && T(t).is(n)) break;
                  r.push(t);
                }
              return r;
            },
            O = function (t, e) {
              for (var n = []; t; t = t.nextSibling)
                1 === t.nodeType && t !== e && n.push(t);
              return n;
            },
            R = T.expr.match.needsContext,
            M =
              /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function W(t, e, n) {
            return v(e)
              ? T.grep(t, function (t, r) {
                  return !!e.call(t, r, t) !== n;
                })
              : e.nodeType
              ? T.grep(t, function (t) {
                  return (t === e) !== n;
                })
              : "string" != typeof e
              ? T.grep(t, function (t) {
                  return u.call(e, t) > -1 !== n;
                })
              : T.filter(e, t, n);
          }
          (T.filter = function (t, e, n) {
            var r = e[0];
            return (
              n && (t = ":not(" + t + ")"),
              1 === e.length && 1 === r.nodeType
                ? T.find.matchesSelector(r, t)
                  ? [r]
                  : []
                : T.find.matches(
                    t,
                    T.grep(e, function (t) {
                      return 1 === t.nodeType;
                    })
                  )
            );
          }),
            T.fn.extend({
              find: function (t) {
                var e,
                  n,
                  r = this.length,
                  o = this;
                if ("string" != typeof t)
                  return this.pushStack(
                    T(t).filter(function () {
                      for (e = 0; e < r; e++)
                        if (T.contains(o[e], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), e = 0; e < r; e++)
                  T.find(t, o[e], n);
                return r > 1 ? T.uniqueSort(n) : n;
              },
              filter: function (t) {
                return this.pushStack(W(this, t || [], !1));
              },
              not: function (t) {
                return this.pushStack(W(this, t || [], !0));
              },
              is: function (t) {
                return !!W(
                  this,
                  "string" == typeof t && R.test(t) ? T(t) : t || [],
                  !1
                ).length;
              },
            });
          var q,
            z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((T.fn.init = function (t, e, n) {
            var r, o;
            if (!t) return this;
            if (((n = n || q), "string" == typeof t)) {
              if (
                !(r =
                  "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                    ? [null, t, null]
                    : z.exec(t)) ||
                (!r[1] && e)
              )
                return !e || e.jquery
                  ? (e || n).find(t)
                  : this.constructor(e).find(t);
              if (r[1]) {
                if (
                  ((e = e instanceof T ? e[0] : e),
                  T.merge(
                    this,
                    T.parseHTML(
                      r[1],
                      e && e.nodeType ? e.ownerDocument || e : y,
                      !0
                    )
                  ),
                  M.test(r[1]) && T.isPlainObject(e))
                )
                  for (r in e) v(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                return this;
              }
              return (
                (o = y.getElementById(r[2])) &&
                  ((this[0] = o), (this.length = 1)),
                this
              );
            }
            return t.nodeType
              ? ((this[0] = t), (this.length = 1), this)
              : v(t)
              ? void 0 !== n.ready
                ? n.ready(t)
                : t(T)
              : T.makeArray(t, this);
          }).prototype = T.fn),
            (q = T(y));
          var $ = /^(?:parents|prev(?:Until|All))/,
            U = { children: !0, contents: !0, next: !0, prev: !0 };
          function X(t, e) {
            for (; (t = t[e]) && 1 !== t.nodeType; );
            return t;
          }
          T.fn.extend({
            has: function (t) {
              var e = T(t, this),
                n = e.length;
              return this.filter(function () {
                for (var t = 0; t < n; t++)
                  if (T.contains(this, e[t])) return !0;
              });
            },
            closest: function (t, e) {
              var n,
                r = 0,
                o = this.length,
                i = [],
                a = "string" != typeof t && T(t);
              if (!R.test(t))
                for (; r < o; r++)
                  for (n = this[r]; n && n !== e; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (a
                        ? a.index(n) > -1
                        : 1 === n.nodeType && T.find.matchesSelector(n, t))
                    ) {
                      i.push(n);
                      break;
                    }
              return this.pushStack(i.length > 1 ? T.uniqueSort(i) : i);
            },
            index: function (t) {
              return t
                ? "string" == typeof t
                  ? u.call(T(t), this[0])
                  : u.call(this, t.jquery ? t[0] : t)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (t, e) {
              return this.pushStack(T.uniqueSort(T.merge(this.get(), T(t, e))));
            },
            addBack: function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            },
          }),
            T.each(
              {
                parent: function (t) {
                  var e = t.parentNode;
                  return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                  return B(t, "parentNode");
                },
                parentsUntil: function (t, e, n) {
                  return B(t, "parentNode", n);
                },
                next: function (t) {
                  return X(t, "nextSibling");
                },
                prev: function (t) {
                  return X(t, "previousSibling");
                },
                nextAll: function (t) {
                  return B(t, "nextSibling");
                },
                prevAll: function (t) {
                  return B(t, "previousSibling");
                },
                nextUntil: function (t, e, n) {
                  return B(t, "nextSibling", n);
                },
                prevUntil: function (t, e, n) {
                  return B(t, "previousSibling", n);
                },
                siblings: function (t) {
                  return O((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                  return O(t.firstChild);
                },
                contents: function (t) {
                  return null != t.contentDocument && a(t.contentDocument)
                    ? t.contentDocument
                    : (I(t, "template") && (t = t.content || t),
                      T.merge([], t.childNodes));
                },
              },
              function (t, e) {
                T.fn[t] = function (n, r) {
                  var o = T.map(this, e, n);
                  return (
                    "Until" !== t.slice(-5) && (r = n),
                    r && "string" == typeof r && (o = T.filter(r, o)),
                    this.length > 1 &&
                      (U[t] || T.uniqueSort(o), $.test(t) && o.reverse()),
                    this.pushStack(o)
                  );
                };
              }
            );
          var V = /[^\x20\t\r\n\f]+/g;
          function J(t) {
            return t;
          }
          function K(t) {
            throw t;
          }
          function G(t, e, n, r) {
            var o;
            try {
              t && v((o = t.promise))
                ? o.call(t).done(e).fail(n)
                : t && v((o = t.then))
                ? o.call(t, e, n)
                : e.apply(void 0, [t].slice(r));
            } catch (t) {
              n.apply(void 0, [t]);
            }
          }
          (T.Callbacks = function (t) {
            t =
              "string" == typeof t
                ? (function (t) {
                    var e = {};
                    return (
                      T.each(t.match(V) || [], function (t, n) {
                        e[n] = !0;
                      }),
                      e
                    );
                  })(t)
                : T.extend({}, t);
            var e,
              n,
              r,
              o,
              i = [],
              a = [],
              s = -1,
              l = function () {
                for (o = o || t.once, r = e = !0; a.length; s = -1)
                  for (n = a.shift(); ++s < i.length; )
                    !1 === i[s].apply(n[0], n[1]) &&
                      t.stopOnFalse &&
                      ((s = i.length), (n = !1));
                t.memory || (n = !1), (e = !1), o && (i = n ? [] : "");
              },
              c = {
                add: function () {
                  return (
                    i &&
                      (n && !e && ((s = i.length - 1), a.push(n)),
                      (function e(n) {
                        T.each(n, function (n, r) {
                          v(r)
                            ? (t.unique && c.has(r)) || i.push(r)
                            : r && r.length && "string" !== S(r) && e(r);
                        });
                      })(arguments),
                      n && !e && l()),
                    this
                  );
                },
                remove: function () {
                  return (
                    T.each(arguments, function (t, e) {
                      for (var n; (n = T.inArray(e, i, n)) > -1; )
                        i.splice(n, 1), n <= s && s--;
                    }),
                    this
                  );
                },
                has: function (t) {
                  return t ? T.inArray(t, i) > -1 : i.length > 0;
                },
                empty: function () {
                  return i && (i = []), this;
                },
                disable: function () {
                  return (o = a = []), (i = n = ""), this;
                },
                disabled: function () {
                  return !i;
                },
                lock: function () {
                  return (o = a = []), n || e || (i = n = ""), this;
                },
                locked: function () {
                  return !!o;
                },
                fireWith: function (t, n) {
                  return (
                    o ||
                      ((n = [t, (n = n || []).slice ? n.slice() : n]),
                      a.push(n),
                      e || l()),
                    this
                  );
                },
                fire: function () {
                  return c.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!r;
                },
              };
            return c;
          }),
            T.extend({
              Deferred: function (t) {
                var e = [
                    [
                      "notify",
                      "progress",
                      T.Callbacks("memory"),
                      T.Callbacks("memory"),
                      2,
                    ],
                    [
                      "resolve",
                      "done",
                      T.Callbacks("once memory"),
                      T.Callbacks("once memory"),
                      0,
                      "resolved",
                    ],
                    [
                      "reject",
                      "fail",
                      T.Callbacks("once memory"),
                      T.Callbacks("once memory"),
                      1,
                      "rejected",
                    ],
                  ],
                  n = "pending",
                  o = {
                    state: function () {
                      return n;
                    },
                    always: function () {
                      return i.done(arguments).fail(arguments), this;
                    },
                    catch: function (t) {
                      return o.then(null, t);
                    },
                    pipe: function () {
                      var t = arguments;
                      return T.Deferred(function (n) {
                        T.each(e, function (e, r) {
                          var o = v(t[r[4]]) && t[r[4]];
                          i[r[1]](function () {
                            var t = o && o.apply(this, arguments);
                            t && v(t.promise)
                              ? t
                                  .promise()
                                  .progress(n.notify)
                                  .done(n.resolve)
                                  .fail(n.reject)
                              : n[r[0] + "With"](this, o ? [t] : arguments);
                          });
                        }),
                          (t = null);
                      }).promise();
                    },
                    then: function (t, n, o) {
                      var i = 0;
                      function a(t, e, n, o) {
                        return function () {
                          var s = this,
                            l = arguments,
                            c = function () {
                              var r, c;
                              if (!(t < i)) {
                                if ((r = n.apply(s, l)) === e.promise())
                                  throw new TypeError(
                                    "Thenable self-resolution"
                                  );
                                (c =
                                  r &&
                                  ("object" == typeof r ||
                                    "function" == typeof r) &&
                                  r.then),
                                  v(c)
                                    ? o
                                      ? c.call(r, a(i, e, J, o), a(i, e, K, o))
                                      : (i++,
                                        c.call(
                                          r,
                                          a(i, e, J, o),
                                          a(i, e, K, o),
                                          a(i, e, J, e.notifyWith)
                                        ))
                                    : (n !== J && ((s = void 0), (l = [r])),
                                      (o || e.resolveWith)(s, l));
                              }
                            },
                            u = o
                              ? c
                              : function () {
                                  try {
                                    c();
                                  } catch (r) {
                                    T.Deferred.exceptionHook &&
                                      T.Deferred.exceptionHook(r, u.error),
                                      t + 1 >= i &&
                                        (n !== K && ((s = void 0), (l = [r])),
                                        e.rejectWith(s, l));
                                  }
                                };
                          t
                            ? u()
                            : (T.Deferred.getErrorHook
                                ? (u.error = T.Deferred.getErrorHook())
                                : T.Deferred.getStackHook &&
                                  (u.error = T.Deferred.getStackHook()),
                              r.setTimeout(u));
                        };
                      }
                      return T.Deferred(function (r) {
                        e[0][3].add(a(0, r, v(o) ? o : J, r.notifyWith)),
                          e[1][3].add(a(0, r, v(t) ? t : J)),
                          e[2][3].add(a(0, r, v(n) ? n : K));
                      }).promise();
                    },
                    promise: function (t) {
                      return null != t ? T.extend(t, o) : o;
                    },
                  },
                  i = {};
                return (
                  T.each(e, function (t, r) {
                    var a = r[2],
                      s = r[5];
                    (o[r[1]] = a.add),
                      s &&
                        a.add(
                          function () {
                            n = s;
                          },
                          e[3 - t][2].disable,
                          e[3 - t][3].disable,
                          e[0][2].lock,
                          e[0][3].lock
                        ),
                      a.add(r[3].fire),
                      (i[r[0]] = function () {
                        return (
                          i[r[0] + "With"](
                            this === i ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (i[r[0] + "With"] = a.fireWith);
                  }),
                  o.promise(i),
                  t && t.call(i, i),
                  i
                );
              },
              when: function (t) {
                var e = arguments.length,
                  n = e,
                  r = Array(n),
                  o = s.call(arguments),
                  i = T.Deferred(),
                  a = function (t) {
                    return function (n) {
                      (r[t] = this),
                        (o[t] = arguments.length > 1 ? s.call(arguments) : n),
                        --e || i.resolveWith(r, o);
                    };
                  };
                if (
                  e <= 1 &&
                  (G(t, i.done(a(n)).resolve, i.reject, !e),
                  "pending" === i.state() || v(o[n] && o[n].then))
                )
                  return i.then();
                for (; n--; ) G(o[n], a(n), i.reject);
                return i.promise();
              },
            });
          var Y = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (T.Deferred.exceptionHook = function (t, e) {
            r.console &&
              r.console.warn &&
              t &&
              Y.test(t.name) &&
              r.console.warn(
                "jQuery.Deferred exception: " + t.message,
                t.stack,
                e
              );
          }),
            (T.readyException = function (t) {
              r.setTimeout(function () {
                throw t;
              });
            });
          var Z = T.Deferred();
          function Q() {
            y.removeEventListener("DOMContentLoaded", Q),
              r.removeEventListener("load", Q),
              T.ready();
          }
          (T.fn.ready = function (t) {
            return (
              Z.then(t).catch(function (t) {
                T.readyException(t);
              }),
              this
            );
          }),
            T.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (t) {
                (!0 === t ? --T.readyWait : T.isReady) ||
                  ((T.isReady = !0),
                  (!0 !== t && --T.readyWait > 0) || Z.resolveWith(y, [T]));
              },
            }),
            (T.ready.then = Z.then),
            "complete" === y.readyState ||
            ("loading" !== y.readyState && !y.documentElement.doScroll)
              ? r.setTimeout(T.ready)
              : (y.addEventListener("DOMContentLoaded", Q),
                r.addEventListener("load", Q));
          var tt = function (t, e, n, r, o, i, a) {
              var s = 0,
                l = t.length,
                c = null == n;
              if ("object" === S(n))
                for (s in ((o = !0), n)) tt(t, e, s, n[s], !0, i, a);
              else if (
                void 0 !== r &&
                ((o = !0),
                v(r) || (a = !0),
                c &&
                  (a
                    ? (e.call(t, r), (e = null))
                    : ((c = e),
                      (e = function (t, e, n) {
                        return c.call(T(t), n);
                      }))),
                e)
              )
                for (; s < l; s++)
                  e(t[s], n, a ? r : r.call(t[s], s, e(t[s], n)));
              return o ? t : c ? e.call(t) : l ? e(t[0], n) : i;
            },
            et = /^-ms-/,
            nt = /-([a-z])/g;
          function rt(t, e) {
            return e.toUpperCase();
          }
          function ot(t) {
            return t.replace(et, "ms-").replace(nt, rt);
          }
          var it = function (t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
          };
          function at() {
            this.expando = T.expando + at.uid++;
          }
          (at.uid = 1),
            (at.prototype = {
              cache: function (t) {
                var e = t[this.expando];
                return (
                  e ||
                    ((e = {}),
                    it(t) &&
                      (t.nodeType
                        ? (t[this.expando] = e)
                        : Object.defineProperty(t, this.expando, {
                            value: e,
                            configurable: !0,
                          }))),
                  e
                );
              },
              set: function (t, e, n) {
                var r,
                  o = this.cache(t);
                if ("string" == typeof e) o[ot(e)] = n;
                else for (r in e) o[ot(r)] = e[r];
                return o;
              },
              get: function (t, e) {
                return void 0 === e
                  ? this.cache(t)
                  : t[this.expando] && t[this.expando][ot(e)];
              },
              access: function (t, e, n) {
                return void 0 === e ||
                  (e && "string" == typeof e && void 0 === n)
                  ? this.get(t, e)
                  : (this.set(t, e, n), void 0 !== n ? n : e);
              },
              remove: function (t, e) {
                var n,
                  r = t[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== e) {
                    n = (e = Array.isArray(e)
                      ? e.map(ot)
                      : (e = ot(e)) in r
                      ? [e]
                      : e.match(V) || []).length;
                    for (; n--; ) delete r[e[n]];
                  }
                  (void 0 === e || T.isEmptyObject(r)) &&
                    (t.nodeType
                      ? (t[this.expando] = void 0)
                      : delete t[this.expando]);
                }
              },
              hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !T.isEmptyObject(e);
              },
            });
          var st = new at(),
            lt = new at(),
            ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ut = /[A-Z]/g;
          function dt(t, e, n) {
            var r;
            if (void 0 === n && 1 === t.nodeType)
              if (
                ((r = "data-" + e.replace(ut, "-$&").toLowerCase()),
                "string" == typeof (n = t.getAttribute(r)))
              ) {
                try {
                  n = (function (t) {
                    return (
                      "true" === t ||
                      ("false" !== t &&
                        ("null" === t
                          ? null
                          : t === +t + ""
                          ? +t
                          : ct.test(t)
                          ? JSON.parse(t)
                          : t))
                    );
                  })(n);
                } catch (t) {}
                lt.set(t, e, n);
              } else n = void 0;
            return n;
          }
          T.extend({
            hasData: function (t) {
              return lt.hasData(t) || st.hasData(t);
            },
            data: function (t, e, n) {
              return lt.access(t, e, n);
            },
            removeData: function (t, e) {
              lt.remove(t, e);
            },
            _data: function (t, e, n) {
              return st.access(t, e, n);
            },
            _removeData: function (t, e) {
              st.remove(t, e);
            },
          }),
            T.fn.extend({
              data: function (t, e) {
                var n,
                  r,
                  o,
                  i = this[0],
                  a = i && i.attributes;
                if (void 0 === t) {
                  if (
                    this.length &&
                    ((o = lt.get(i)),
                    1 === i.nodeType && !st.get(i, "hasDataAttrs"))
                  ) {
                    for (n = a.length; n--; )
                      a[n] &&
                        0 === (r = a[n].name).indexOf("data-") &&
                        ((r = ot(r.slice(5))), dt(i, r, o[r]));
                    st.set(i, "hasDataAttrs", !0);
                  }
                  return o;
                }
                return "object" == typeof t
                  ? this.each(function () {
                      lt.set(this, t);
                    })
                  : tt(
                      this,
                      function (e) {
                        var n;
                        if (i && void 0 === e)
                          return void 0 !== (n = lt.get(i, t)) ||
                            void 0 !== (n = dt(i, t))
                            ? n
                            : void 0;
                        this.each(function () {
                          lt.set(this, t, e);
                        });
                      },
                      null,
                      e,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (t) {
                return this.each(function () {
                  lt.remove(this, t);
                });
              },
            }),
            T.extend({
              queue: function (t, e, n) {
                var r;
                if (t)
                  return (
                    (e = (e || "fx") + "queue"),
                    (r = st.get(t, e)),
                    n &&
                      (!r || Array.isArray(n)
                        ? (r = st.access(t, e, T.makeArray(n)))
                        : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (t, e) {
                e = e || "fx";
                var n = T.queue(t, e),
                  r = n.length,
                  o = n.shift(),
                  i = T._queueHooks(t, e);
                "inprogress" === o && ((o = n.shift()), r--),
                  o &&
                    ("fx" === e && n.unshift("inprogress"),
                    delete i.stop,
                    o.call(
                      t,
                      function () {
                        T.dequeue(t, e);
                      },
                      i
                    )),
                  !r && i && i.empty.fire();
              },
              _queueHooks: function (t, e) {
                var n = e + "queueHooks";
                return (
                  st.get(t, n) ||
                  st.access(t, n, {
                    empty: T.Callbacks("once memory").add(function () {
                      st.remove(t, [e + "queue", n]);
                    }),
                  })
                );
              },
            }),
            T.fn.extend({
              queue: function (t, e) {
                var n = 2;
                return (
                  "string" != typeof t && ((e = t), (t = "fx"), n--),
                  arguments.length < n
                    ? T.queue(this[0], t)
                    : void 0 === e
                    ? this
                    : this.each(function () {
                        var n = T.queue(this, t, e);
                        T._queueHooks(this, t),
                          "fx" === t &&
                            "inprogress" !== n[0] &&
                            T.dequeue(this, t);
                      })
                );
              },
              dequeue: function (t) {
                return this.each(function () {
                  T.dequeue(this, t);
                });
              },
              clearQueue: function (t) {
                return this.queue(t || "fx", []);
              },
              promise: function (t, e) {
                var n,
                  r = 1,
                  o = T.Deferred(),
                  i = this,
                  a = this.length,
                  s = function () {
                    --r || o.resolveWith(i, [i]);
                  };
                for (
                  "string" != typeof t && ((e = t), (t = void 0)),
                    t = t || "fx";
                  a--;

                )
                  (n = st.get(i[a], t + "queueHooks")) &&
                    n.empty &&
                    (r++, n.empty.add(s));
                return s(), o.promise(e);
              },
            });
          var ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            pt = new RegExp("^(?:([+-])=|)(" + ft + ")([a-z%]*)$", "i"),
            ht = ["Top", "Right", "Bottom", "Left"],
            mt = y.documentElement,
            gt = function (t) {
              return T.contains(t.ownerDocument, t);
            },
            vt = { composed: !0 };
          mt.getRootNode &&
            (gt = function (t) {
              return (
                T.contains(t.ownerDocument, t) ||
                t.getRootNode(vt) === t.ownerDocument
              );
            });
          var bt = function (t, e) {
            return (
              "none" === (t = e || t).style.display ||
              ("" === t.style.display &&
                gt(t) &&
                "none" === T.css(t, "display"))
            );
          };
          function yt(t, e, n, r) {
            var o,
              i,
              a = 20,
              s = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return T.css(t, e, "");
                  },
              l = s(),
              c = (n && n[3]) || (T.cssNumber[e] ? "" : "px"),
              u =
                t.nodeType &&
                (T.cssNumber[e] || ("px" !== c && +l)) &&
                pt.exec(T.css(t, e));
            if (u && u[3] !== c) {
              for (l /= 2, c = c || u[3], u = +l || 1; a--; )
                T.style(t, e, u + c),
                  (1 - i) * (1 - (i = s() / l || 0.5)) <= 0 && (a = 0),
                  (u /= i);
              (u *= 2), T.style(t, e, u + c), (n = n || []);
            }
            return (
              n &&
                ((u = +u || +l || 0),
                (o = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = c), (r.start = u), (r.end = o))),
              o
            );
          }
          var xt = {};
          function wt(t) {
            var e,
              n = t.ownerDocument,
              r = t.nodeName,
              o = xt[r];
            return (
              o ||
              ((e = n.body.appendChild(n.createElement(r))),
              (o = T.css(e, "display")),
              e.parentNode.removeChild(e),
              "none" === o && (o = "block"),
              (xt[r] = o),
              o)
            );
          }
          function St(t, e) {
            for (var n, r, o = [], i = 0, a = t.length; i < a; i++)
              (r = t[i]).style &&
                ((n = r.style.display),
                e
                  ? ("none" === n &&
                      ((o[i] = st.get(r, "display") || null),
                      o[i] || (r.style.display = "")),
                    "" === r.style.display && bt(r) && (o[i] = wt(r)))
                  : "none" !== n && ((o[i] = "none"), st.set(r, "display", n)));
            for (i = 0; i < a; i++) null != o[i] && (t[i].style.display = o[i]);
            return t;
          }
          T.fn.extend({
            show: function () {
              return St(this, !0);
            },
            hide: function () {
              return St(this);
            },
            toggle: function (t) {
              return "boolean" == typeof t
                ? t
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    bt(this) ? T(this).show() : T(this).hide();
                  });
            },
          });
          var Ct,
            _t,
            Tt = /^(?:checkbox|radio)$/i,
            Dt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            It = /^$|^module$|\/(?:java|ecma)script/i;
          (Ct = y.createDocumentFragment().appendChild(y.createElement("div"))),
            (_t = y.createElement("input")).setAttribute("type", "radio"),
            _t.setAttribute("checked", "checked"),
            _t.setAttribute("name", "t"),
            Ct.appendChild(_t),
            (g.checkClone = Ct.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (Ct.innerHTML = "<textarea>x</textarea>"),
            (g.noCloneChecked = !!Ct.cloneNode(!0).lastChild.defaultValue),
            (Ct.innerHTML = "<option></option>"),
            (g.option = !!Ct.lastChild);
          var At = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
          };
          function Ft(t, e) {
            var n;
            return (
              (n =
                void 0 !== t.getElementsByTagName
                  ? t.getElementsByTagName(e || "*")
                  : void 0 !== t.querySelectorAll
                  ? t.querySelectorAll(e || "*")
                  : []),
              void 0 === e || (e && I(t, e)) ? T.merge([t], n) : n
            );
          }
          function kt(t, e) {
            for (var n = 0, r = t.length; n < r; n++)
              st.set(t[n], "globalEval", !e || st.get(e[n], "globalEval"));
          }
          (At.tbody = At.tfoot = At.colgroup = At.caption = At.thead),
            (At.th = At.td),
            g.option ||
              (At.optgroup = At.option =
                [1, "<select multiple='multiple'>", "</select>"]);
          var Nt = /<|&#?\w+;/;
          function Lt(t, e, n, r, o) {
            for (
              var i,
                a,
                s,
                l,
                c,
                u,
                d = e.createDocumentFragment(),
                f = [],
                p = 0,
                h = t.length;
              p < h;
              p++
            )
              if ((i = t[p]) || 0 === i)
                if ("object" === S(i)) T.merge(f, i.nodeType ? [i] : i);
                else if (Nt.test(i)) {
                  for (
                    a = a || d.appendChild(e.createElement("div")),
                      s = (Dt.exec(i) || ["", ""])[1].toLowerCase(),
                      l = At[s] || At._default,
                      a.innerHTML = l[1] + T.htmlPrefilter(i) + l[2],
                      u = l[0];
                    u--;

                  )
                    a = a.lastChild;
                  T.merge(f, a.childNodes),
                    ((a = d.firstChild).textContent = "");
                } else f.push(e.createTextNode(i));
            for (d.textContent = "", p = 0; (i = f[p++]); )
              if (r && T.inArray(i, r) > -1) o && o.push(i);
              else if (
                ((c = gt(i)),
                (a = Ft(d.appendChild(i), "script")),
                c && kt(a),
                n)
              )
                for (u = 0; (i = a[u++]); ) It.test(i.type || "") && n.push(i);
            return d;
          }
          var Ht = /^([^.]*)(?:\.(.+)|)/;
          function jt() {
            return !0;
          }
          function Et() {
            return !1;
          }
          function Pt(t, e, n, r, o, i) {
            var a, s;
            if ("object" == typeof e) {
              for (s in ("string" != typeof n && ((r = r || n), (n = void 0)),
              e))
                Pt(t, s, n, r, e[s], i);
              return t;
            }
            if (
              (null == r && null == o
                ? ((o = n), (r = n = void 0))
                : null == o &&
                  ("string" == typeof n
                    ? ((o = r), (r = void 0))
                    : ((o = r), (r = n), (n = void 0))),
              !1 === o)
            )
              o = Et;
            else if (!o) return t;
            return (
              1 === i &&
                ((a = o),
                (o = function (t) {
                  return T().off(t), a.apply(this, arguments);
                }),
                (o.guid = a.guid || (a.guid = T.guid++))),
              t.each(function () {
                T.event.add(this, e, o, r, n);
              })
            );
          }
          function Bt(t, e, n) {
            n
              ? (st.set(t, e, !1),
                T.event.add(t, e, {
                  namespace: !1,
                  handler: function (t) {
                    var n,
                      r = st.get(this, e);
                    if (1 & t.isTrigger && this[e]) {
                      if (r)
                        (T.event.special[e] || {}).delegateType &&
                          t.stopPropagation();
                      else if (
                        ((r = s.call(arguments)),
                        st.set(this, e, r),
                        this[e](),
                        (n = st.get(this, e)),
                        st.set(this, e, !1),
                        r !== n)
                      )
                        return (
                          t.stopImmediatePropagation(), t.preventDefault(), n
                        );
                    } else
                      r &&
                        (st.set(
                          this,
                          e,
                          T.event.trigger(r[0], r.slice(1), this)
                        ),
                        t.stopPropagation(),
                        (t.isImmediatePropagationStopped = jt));
                  },
                }))
              : void 0 === st.get(t, e) && T.event.add(t, e, jt);
          }
          (T.event = {
            global: {},
            add: function (t, e, n, r, o) {
              var i,
                a,
                s,
                l,
                c,
                u,
                d,
                f,
                p,
                h,
                m,
                g = st.get(t);
              if (it(t))
                for (
                  n.handler && ((n = (i = n).handler), (o = i.selector)),
                    o && T.find.matchesSelector(mt, o),
                    n.guid || (n.guid = T.guid++),
                    (l = g.events) || (l = g.events = Object.create(null)),
                    (a = g.handle) ||
                      (a = g.handle =
                        function (e) {
                          return void 0 !== T && T.event.triggered !== e.type
                            ? T.event.dispatch.apply(t, arguments)
                            : void 0;
                        }),
                    c = (e = (e || "").match(V) || [""]).length;
                  c--;

                )
                  (p = m = (s = Ht.exec(e[c]) || [])[1]),
                    (h = (s[2] || "").split(".").sort()),
                    p &&
                      ((d = T.event.special[p] || {}),
                      (p = (o ? d.delegateType : d.bindType) || p),
                      (d = T.event.special[p] || {}),
                      (u = T.extend(
                        {
                          type: p,
                          origType: m,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: o,
                          needsContext: o && T.expr.match.needsContext.test(o),
                          namespace: h.join("."),
                        },
                        i
                      )),
                      (f = l[p]) ||
                        (((f = l[p] = []).delegateCount = 0),
                        (d.setup && !1 !== d.setup.call(t, r, h, a)) ||
                          (t.addEventListener && t.addEventListener(p, a))),
                      d.add &&
                        (d.add.call(t, u),
                        u.handler.guid || (u.handler.guid = n.guid)),
                      o ? f.splice(f.delegateCount++, 0, u) : f.push(u),
                      (T.event.global[p] = !0));
            },
            remove: function (t, e, n, r, o) {
              var i,
                a,
                s,
                l,
                c,
                u,
                d,
                f,
                p,
                h,
                m,
                g = st.hasData(t) && st.get(t);
              if (g && (l = g.events)) {
                for (c = (e = (e || "").match(V) || [""]).length; c--; )
                  if (
                    ((p = m = (s = Ht.exec(e[c]) || [])[1]),
                    (h = (s[2] || "").split(".").sort()),
                    p)
                  ) {
                    for (
                      d = T.event.special[p] || {},
                        f =
                          l[(p = (r ? d.delegateType : d.bindType) || p)] || [],
                        s =
                          s[2] &&
                          new RegExp(
                            "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          ),
                        a = i = f.length;
                      i--;

                    )
                      (u = f[i]),
                        (!o && m !== u.origType) ||
                          (n && n.guid !== u.guid) ||
                          (s && !s.test(u.namespace)) ||
                          (r &&
                            r !== u.selector &&
                            ("**" !== r || !u.selector)) ||
                          (f.splice(i, 1),
                          u.selector && f.delegateCount--,
                          d.remove && d.remove.call(t, u));
                    a &&
                      !f.length &&
                      ((d.teardown && !1 !== d.teardown.call(t, h, g.handle)) ||
                        T.removeEvent(t, p, g.handle),
                      delete l[p]);
                  } else for (p in l) T.event.remove(t, p + e[c], n, r, !0);
                T.isEmptyObject(l) && st.remove(t, "handle events");
              }
            },
            dispatch: function (t) {
              var e,
                n,
                r,
                o,
                i,
                a,
                s = new Array(arguments.length),
                l = T.event.fix(t),
                c =
                  (st.get(this, "events") || Object.create(null))[l.type] || [],
                u = T.event.special[l.type] || {};
              for (s[0] = l, e = 1; e < arguments.length; e++)
                s[e] = arguments[e];
              if (
                ((l.delegateTarget = this),
                !u.preDispatch || !1 !== u.preDispatch.call(this, l))
              ) {
                for (
                  a = T.event.handlers.call(this, l, c), e = 0;
                  (o = a[e++]) && !l.isPropagationStopped();

                )
                  for (
                    l.currentTarget = o.elem, n = 0;
                    (i = o.handlers[n++]) && !l.isImmediatePropagationStopped();

                  )
                    (l.rnamespace &&
                      !1 !== i.namespace &&
                      !l.rnamespace.test(i.namespace)) ||
                      ((l.handleObj = i),
                      (l.data = i.data),
                      void 0 !==
                        (r = (
                          (T.event.special[i.origType] || {}).handle ||
                          i.handler
                        ).apply(o.elem, s)) &&
                        !1 === (l.result = r) &&
                        (l.preventDefault(), l.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, l), l.result;
              }
            },
            handlers: function (t, e) {
              var n,
                r,
                o,
                i,
                a,
                s = [],
                l = e.delegateCount,
                c = t.target;
              if (l && c.nodeType && !("click" === t.type && t.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                  if (
                    1 === c.nodeType &&
                    ("click" !== t.type || !0 !== c.disabled)
                  ) {
                    for (i = [], a = {}, n = 0; n < l; n++)
                      void 0 === a[(o = (r = e[n]).selector + " ")] &&
                        (a[o] = r.needsContext
                          ? T(o, this).index(c) > -1
                          : T.find(o, this, null, [c]).length),
                        a[o] && i.push(r);
                    i.length && s.push({ elem: c, handlers: i });
                  }
              return (
                (c = this),
                l < e.length && s.push({ elem: c, handlers: e.slice(l) }),
                s
              );
            },
            addProp: function (t, e) {
              Object.defineProperty(T.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: v(e)
                  ? function () {
                      if (this.originalEvent) return e(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[t];
                    },
                set: function (e) {
                  Object.defineProperty(this, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: e,
                  });
                },
              });
            },
            fix: function (t) {
              return t[T.expando] ? t : new T.Event(t);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (t) {
                  var e = this || t;
                  return (
                    Tt.test(e.type) &&
                      e.click &&
                      I(e, "input") &&
                      Bt(e, "click", !0),
                    !1
                  );
                },
                trigger: function (t) {
                  var e = this || t;
                  return (
                    Tt.test(e.type) &&
                      e.click &&
                      I(e, "input") &&
                      Bt(e, "click"),
                    !0
                  );
                },
                _default: function (t) {
                  var e = t.target;
                  return (
                    (Tt.test(e.type) &&
                      e.click &&
                      I(e, "input") &&
                      st.get(e, "click")) ||
                    I(e, "a")
                  );
                },
              },
              beforeunload: {
                postDispatch: function (t) {
                  void 0 !== t.result &&
                    t.originalEvent &&
                    (t.originalEvent.returnValue = t.result);
                },
              },
            },
          }),
            (T.removeEvent = function (t, e, n) {
              t.removeEventListener && t.removeEventListener(e, n);
            }),
            (T.Event = function (t, e) {
              if (!(this instanceof T.Event)) return new T.Event(t, e);
              t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented =
                    t.defaultPrevented ||
                    (void 0 === t.defaultPrevented && !1 === t.returnValue)
                      ? jt
                      : Et),
                  (this.target =
                    t.target && 3 === t.target.nodeType
                      ? t.target.parentNode
                      : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && T.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[T.expando] = !0);
            }),
            (T.Event.prototype = {
              constructor: T.Event,
              isDefaultPrevented: Et,
              isPropagationStopped: Et,
              isImmediatePropagationStopped: Et,
              isSimulated: !1,
              preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = jt),
                  t && !this.isSimulated && t.preventDefault();
              },
              stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = jt),
                  t && !this.isSimulated && t.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = jt),
                  t && !this.isSimulated && t.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            T.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0,
              },
              T.event.addProp
            ),
            T.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
              function n(t) {
                if (y.documentMode) {
                  var n = st.get(this, "handle"),
                    r = T.event.fix(t);
                  (r.type = "focusin" === t.type ? "focus" : "blur"),
                    (r.isSimulated = !0),
                    n(t),
                    r.target === r.currentTarget && n(r);
                } else T.event.simulate(e, t.target, T.event.fix(t));
              }
              (T.event.special[t] = {
                setup: function () {
                  var r;
                  if ((Bt(this, t, !0), !y.documentMode)) return !1;
                  (r = st.get(this, e)) || this.addEventListener(e, n),
                    st.set(this, e, (r || 0) + 1);
                },
                trigger: function () {
                  return Bt(this, t), !0;
                },
                teardown: function () {
                  var t;
                  if (!y.documentMode) return !1;
                  (t = st.get(this, e) - 1)
                    ? st.set(this, e, t)
                    : (this.removeEventListener(e, n), st.remove(this, e));
                },
                _default: function (e) {
                  return st.get(e.target, t);
                },
                delegateType: e,
              }),
                (T.event.special[e] = {
                  setup: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = y.documentMode ? this : r,
                      i = st.get(o, e);
                    i ||
                      (y.documentMode
                        ? this.addEventListener(e, n)
                        : r.addEventListener(t, n, !0)),
                      st.set(o, e, (i || 0) + 1);
                  },
                  teardown: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = y.documentMode ? this : r,
                      i = st.get(o, e) - 1;
                    i
                      ? st.set(o, e, i)
                      : (y.documentMode
                          ? this.removeEventListener(e, n)
                          : r.removeEventListener(t, n, !0),
                        st.remove(o, e));
                  },
                });
            }),
            T.each(
              {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
              },
              function (t, e) {
                T.event.special[t] = {
                  delegateType: e,
                  bindType: e,
                  handle: function (t) {
                    var n,
                      r = t.relatedTarget,
                      o = t.handleObj;
                    return (
                      (r && (r === this || T.contains(this, r))) ||
                        ((t.type = o.origType),
                        (n = o.handler.apply(this, arguments)),
                        (t.type = e)),
                      n
                    );
                  },
                };
              }
            ),
            T.fn.extend({
              on: function (t, e, n, r) {
                return Pt(this, t, e, n, r);
              },
              one: function (t, e, n, r) {
                return Pt(this, t, e, n, r, 1);
              },
              off: function (t, e, n) {
                var r, o;
                if (t && t.preventDefault && t.handleObj)
                  return (
                    (r = t.handleObj),
                    T(t.delegateTarget).off(
                      r.namespace ? r.origType + "." + r.namespace : r.origType,
                      r.selector,
                      r.handler
                    ),
                    this
                  );
                if ("object" == typeof t) {
                  for (o in t) this.off(o, e, t[o]);
                  return this;
                }
                return (
                  (!1 !== e && "function" != typeof e) ||
                    ((n = e), (e = void 0)),
                  !1 === n && (n = Et),
                  this.each(function () {
                    T.event.remove(this, t, n, e);
                  })
                );
              },
            });
          var Ot = /<script|<style|<link/i,
            Rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Mt = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
          function Wt(t, e) {
            return (
              (I(t, "table") &&
                I(11 !== e.nodeType ? e : e.firstChild, "tr") &&
                T(t).children("tbody")[0]) ||
              t
            );
          }
          function qt(t) {
            return (
              (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t
            );
          }
          function zt(t) {
            return (
              "true/" === (t.type || "").slice(0, 5)
                ? (t.type = t.type.slice(5))
                : t.removeAttribute("type"),
              t
            );
          }
          function $t(t, e) {
            var n, r, o, i, a, s;
            if (1 === e.nodeType) {
              if (st.hasData(t) && (s = st.get(t).events))
                for (o in (st.remove(e, "handle events"), s))
                  for (n = 0, r = s[o].length; n < r; n++)
                    T.event.add(e, o, s[o][n]);
              lt.hasData(t) &&
                ((i = lt.access(t)), (a = T.extend({}, i)), lt.set(e, a));
            }
          }
          function Ut(t, e) {
            var n = e.nodeName.toLowerCase();
            "input" === n && Tt.test(t.type)
              ? (e.checked = t.checked)
              : ("input" !== n && "textarea" !== n) ||
                (e.defaultValue = t.defaultValue);
          }
          function Xt(t, e, n, r) {
            e = l(e);
            var o,
              i,
              a,
              s,
              c,
              u,
              d = 0,
              f = t.length,
              p = f - 1,
              h = e[0],
              m = v(h);
            if (
              m ||
              (f > 1 && "string" == typeof h && !g.checkClone && Rt.test(h))
            )
              return t.each(function (o) {
                var i = t.eq(o);
                m && (e[0] = h.call(this, o, i.html())), Xt(i, e, n, r);
              });
            if (
              f &&
              ((i = (o = Lt(e, t[0].ownerDocument, !1, t, r)).firstChild),
              1 === o.childNodes.length && (o = i),
              i || r)
            ) {
              for (s = (a = T.map(Ft(o, "script"), qt)).length; d < f; d++)
                (c = o),
                  d !== p &&
                    ((c = T.clone(c, !0, !0)),
                    s && T.merge(a, Ft(c, "script"))),
                  n.call(t[d], c, d);
              if (s)
                for (
                  u = a[a.length - 1].ownerDocument, T.map(a, zt), d = 0;
                  d < s;
                  d++
                )
                  (c = a[d]),
                    It.test(c.type || "") &&
                      !st.access(c, "globalEval") &&
                      T.contains(u, c) &&
                      (c.src && "module" !== (c.type || "").toLowerCase()
                        ? T._evalUrl &&
                          !c.noModule &&
                          T._evalUrl(
                            c.src,
                            { nonce: c.nonce || c.getAttribute("nonce") },
                            u
                          )
                        : w(c.textContent.replace(Mt, ""), c, u));
            }
            return t;
          }
          function Vt(t, e, n) {
            for (
              var r, o = e ? T.filter(e, t) : t, i = 0;
              null != (r = o[i]);
              i++
            )
              n || 1 !== r.nodeType || T.cleanData(Ft(r)),
                r.parentNode &&
                  (n && gt(r) && kt(Ft(r, "script")),
                  r.parentNode.removeChild(r));
            return t;
          }
          T.extend({
            htmlPrefilter: function (t) {
              return t;
            },
            clone: function (t, e, n) {
              var r,
                o,
                i,
                a,
                s = t.cloneNode(!0),
                l = gt(t);
              if (
                !(
                  g.noCloneChecked ||
                  (1 !== t.nodeType && 11 !== t.nodeType) ||
                  T.isXMLDoc(t)
                )
              )
                for (a = Ft(s), r = 0, o = (i = Ft(t)).length; r < o; r++)
                  Ut(i[r], a[r]);
              if (e)
                if (n)
                  for (
                    i = i || Ft(t), a = a || Ft(s), r = 0, o = i.length;
                    r < o;
                    r++
                  )
                    $t(i[r], a[r]);
                else $t(t, s);
              return (
                (a = Ft(s, "script")).length > 0 &&
                  kt(a, !l && Ft(t, "script")),
                s
              );
            },
            cleanData: function (t) {
              for (
                var e, n, r, o = T.event.special, i = 0;
                void 0 !== (n = t[i]);
                i++
              )
                if (it(n)) {
                  if ((e = n[st.expando])) {
                    if (e.events)
                      for (r in e.events)
                        o[r]
                          ? T.event.remove(n, r)
                          : T.removeEvent(n, r, e.handle);
                    n[st.expando] = void 0;
                  }
                  n[lt.expando] && (n[lt.expando] = void 0);
                }
            },
          }),
            T.fn.extend({
              detach: function (t) {
                return Vt(this, t, !0);
              },
              remove: function (t) {
                return Vt(this, t);
              },
              text: function (t) {
                return tt(
                  this,
                  function (t) {
                    return void 0 === t
                      ? T.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = t);
                        });
                  },
                  null,
                  t,
                  arguments.length
                );
              },
              append: function () {
                return Xt(this, arguments, function (t) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Wt(this, t).appendChild(t);
                });
              },
              prepend: function () {
                return Xt(this, arguments, function (t) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var e = Wt(this, t);
                    e.insertBefore(t, e.firstChild);
                  }
                });
              },
              before: function () {
                return Xt(this, arguments, function (t) {
                  this.parentNode && this.parentNode.insertBefore(t, this);
                });
              },
              after: function () {
                return Xt(this, arguments, function (t) {
                  this.parentNode &&
                    this.parentNode.insertBefore(t, this.nextSibling);
                });
              },
              empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++)
                  1 === t.nodeType &&
                    (T.cleanData(Ft(t, !1)), (t.textContent = ""));
                return this;
              },
              clone: function (t, e) {
                return (
                  (t = null != t && t),
                  (e = null == e ? t : e),
                  this.map(function () {
                    return T.clone(this, t, e);
                  })
                );
              },
              html: function (t) {
                return tt(
                  this,
                  function (t) {
                    var e = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if (
                      "string" == typeof t &&
                      !Ot.test(t) &&
                      !At[(Dt.exec(t) || ["", ""])[1].toLowerCase()]
                    ) {
                      t = T.htmlPrefilter(t);
                      try {
                        for (; n < r; n++)
                          1 === (e = this[n] || {}).nodeType &&
                            (T.cleanData(Ft(e, !1)), (e.innerHTML = t));
                        e = 0;
                      } catch (t) {}
                    }
                    e && this.empty().append(t);
                  },
                  null,
                  t,
                  arguments.length
                );
              },
              replaceWith: function () {
                var t = [];
                return Xt(
                  this,
                  arguments,
                  function (e) {
                    var n = this.parentNode;
                    T.inArray(this, t) < 0 &&
                      (T.cleanData(Ft(this)), n && n.replaceChild(e, this));
                  },
                  t
                );
              },
            }),
            T.each(
              {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
              },
              function (t, e) {
                T.fn[t] = function (t) {
                  for (
                    var n, r = [], o = T(t), i = o.length - 1, a = 0;
                    a <= i;
                    a++
                  )
                    (n = a === i ? this : this.clone(!0)),
                      T(o[a])[e](n),
                      c.apply(r, n.get());
                  return this.pushStack(r);
                };
              }
            );
          var Jt = new RegExp("^(" + ft + ")(?!px)[a-z%]+$", "i"),
            Kt = /^--/,
            Gt = function (t) {
              var e = t.ownerDocument.defaultView;
              return (e && e.opener) || (e = r), e.getComputedStyle(t);
            },
            Yt = function (t, e, n) {
              var r,
                o,
                i = {};
              for (o in e) (i[o] = t.style[o]), (t.style[o] = e[o]);
              for (o in ((r = n.call(t)), e)) t.style[o] = i[o];
              return r;
            },
            Zt = new RegExp(ht.join("|"), "i");
          function Qt(t, e, n) {
            var r,
              o,
              i,
              a,
              s = Kt.test(e),
              l = t.style;
            return (
              (n = n || Gt(t)) &&
                ((a = n.getPropertyValue(e) || n[e]),
                s && a && (a = a.replace(L, "$1") || void 0),
                "" !== a || gt(t) || (a = T.style(t, e)),
                !g.pixelBoxStyles() &&
                  Jt.test(a) &&
                  Zt.test(e) &&
                  ((r = l.width),
                  (o = l.minWidth),
                  (i = l.maxWidth),
                  (l.minWidth = l.maxWidth = l.width = a),
                  (a = n.width),
                  (l.width = r),
                  (l.minWidth = o),
                  (l.maxWidth = i))),
              void 0 !== a ? a + "" : a
            );
          }
          function te(t, e) {
            return {
              get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function t() {
              if (u) {
                (c.style.cssText =
                  "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                  (u.style.cssText =
                    "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                  mt.appendChild(c).appendChild(u);
                var t = r.getComputedStyle(u);
                (n = "1%" !== t.top),
                  (l = 12 === e(t.marginLeft)),
                  (u.style.right = "60%"),
                  (a = 36 === e(t.right)),
                  (o = 36 === e(t.width)),
                  (u.style.position = "absolute"),
                  (i = 12 === e(u.offsetWidth / 3)),
                  mt.removeChild(c),
                  (u = null);
              }
            }
            function e(t) {
              return Math.round(parseFloat(t));
            }
            var n,
              o,
              i,
              a,
              s,
              l,
              c = y.createElement("div"),
              u = y.createElement("div");
            u.style &&
              ((u.style.backgroundClip = "content-box"),
              (u.cloneNode(!0).style.backgroundClip = ""),
              (g.clearCloneStyle = "content-box" === u.style.backgroundClip),
              T.extend(g, {
                boxSizingReliable: function () {
                  return t(), o;
                },
                pixelBoxStyles: function () {
                  return t(), a;
                },
                pixelPosition: function () {
                  return t(), n;
                },
                reliableMarginLeft: function () {
                  return t(), l;
                },
                scrollboxSize: function () {
                  return t(), i;
                },
                reliableTrDimensions: function () {
                  var t, e, n, o;
                  return (
                    null == s &&
                      ((t = y.createElement("table")),
                      (e = y.createElement("tr")),
                      (n = y.createElement("div")),
                      (t.style.cssText =
                        "position:absolute;left:-11111px;border-collapse:separate"),
                      (e.style.cssText = "border:1px solid"),
                      (e.style.height = "1px"),
                      (n.style.height = "9px"),
                      (n.style.display = "block"),
                      mt.appendChild(t).appendChild(e).appendChild(n),
                      (o = r.getComputedStyle(e)),
                      (s =
                        parseInt(o.height, 10) +
                          parseInt(o.borderTopWidth, 10) +
                          parseInt(o.borderBottomWidth, 10) ===
                        e.offsetHeight),
                      mt.removeChild(t)),
                    s
                  );
                },
              }));
          })();
          var ee = ["Webkit", "Moz", "ms"],
            ne = y.createElement("div").style,
            re = {};
          function oe(t) {
            var e = T.cssProps[t] || re[t];
            return (
              e ||
              (t in ne
                ? t
                : (re[t] =
                    (function (t) {
                      for (
                        var e = t[0].toUpperCase() + t.slice(1), n = ee.length;
                        n--;

                      )
                        if ((t = ee[n] + e) in ne) return t;
                    })(t) || t))
            );
          }
          var ie = /^(none|table(?!-c[ea]).+)/,
            ae = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            se = { letterSpacing: "0", fontWeight: "400" };
          function le(t, e, n) {
            var r = pt.exec(e);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e;
          }
          function ce(t, e, n, r, o, i) {
            var a = "width" === e ? 1 : 0,
              s = 0,
              l = 0,
              c = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; a < 4; a += 2)
              "margin" === n && (c += T.css(t, n + ht[a], !0, o)),
                r
                  ? ("content" === n &&
                      (l -= T.css(t, "padding" + ht[a], !0, o)),
                    "margin" !== n &&
                      (l -= T.css(t, "border" + ht[a] + "Width", !0, o)))
                  : ((l += T.css(t, "padding" + ht[a], !0, o)),
                    "padding" !== n
                      ? (l += T.css(t, "border" + ht[a] + "Width", !0, o))
                      : (s += T.css(t, "border" + ht[a] + "Width", !0, o)));
            return (
              !r &&
                i >= 0 &&
                (l +=
                  Math.max(
                    0,
                    Math.ceil(
                      t["offset" + e[0].toUpperCase() + e.slice(1)] -
                        i -
                        l -
                        s -
                        0.5
                    )
                  ) || 0),
              l + c
            );
          }
          function ue(t, e, n) {
            var r = Gt(t),
              o =
                (!g.boxSizingReliable() || n) &&
                "border-box" === T.css(t, "boxSizing", !1, r),
              i = o,
              a = Qt(t, e, r),
              s = "offset" + e[0].toUpperCase() + e.slice(1);
            if (Jt.test(a)) {
              if (!n) return a;
              a = "auto";
            }
            return (
              ((!g.boxSizingReliable() && o) ||
                (!g.reliableTrDimensions() && I(t, "tr")) ||
                "auto" === a ||
                (!parseFloat(a) && "inline" === T.css(t, "display", !1, r))) &&
                t.getClientRects().length &&
                ((o = "border-box" === T.css(t, "boxSizing", !1, r)),
                (i = s in t) && (a = t[s])),
              (a = parseFloat(a) || 0) +
                ce(t, e, n || (o ? "border" : "content"), i, r, a) +
                "px"
            );
          }
          function de(t, e, n, r, o) {
            return new de.prototype.init(t, e, n, r, o);
          }
          T.extend({
            cssHooks: {
              opacity: {
                get: function (t, e) {
                  if (e) {
                    var n = Qt(t, "opacity");
                    return "" === n ? "1" : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              aspectRatio: !0,
              borderImageSlice: !0,
              columnCount: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              scale: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
              fillOpacity: !0,
              floodOpacity: !0,
              stopOpacity: !0,
              strokeMiterlimit: !0,
              strokeOpacity: !0,
            },
            cssProps: {},
            style: function (t, e, n, r) {
              if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o,
                  i,
                  a,
                  s = ot(e),
                  l = Kt.test(e),
                  c = t.style;
                if (
                  (l || (e = oe(s)),
                  (a = T.cssHooks[e] || T.cssHooks[s]),
                  void 0 === n)
                )
                  return a && "get" in a && void 0 !== (o = a.get(t, !1, r))
                    ? o
                    : c[e];
                "string" === (i = typeof n) &&
                  (o = pt.exec(n)) &&
                  o[1] &&
                  ((n = yt(t, e, o)), (i = "number")),
                  null != n &&
                    n == n &&
                    ("number" !== i ||
                      l ||
                      (n += (o && o[3]) || (T.cssNumber[s] ? "" : "px")),
                    g.clearCloneStyle ||
                      "" !== n ||
                      0 !== e.indexOf("background") ||
                      (c[e] = "inherit"),
                    (a && "set" in a && void 0 === (n = a.set(t, n, r))) ||
                      (l ? c.setProperty(e, n) : (c[e] = n)));
              }
            },
            css: function (t, e, n, r) {
              var o,
                i,
                a,
                s = ot(e);
              return (
                Kt.test(e) || (e = oe(s)),
                (a = T.cssHooks[e] || T.cssHooks[s]) &&
                  "get" in a &&
                  (o = a.get(t, !0, n)),
                void 0 === o && (o = Qt(t, e, r)),
                "normal" === o && e in se && (o = se[e]),
                "" === n || n
                  ? ((i = parseFloat(o)), !0 === n || isFinite(i) ? i || 0 : o)
                  : o
              );
            },
          }),
            T.each(["height", "width"], function (t, e) {
              T.cssHooks[e] = {
                get: function (t, n, r) {
                  if (n)
                    return !ie.test(T.css(t, "display")) ||
                      (t.getClientRects().length &&
                        t.getBoundingClientRect().width)
                      ? ue(t, e, r)
                      : Yt(t, ae, function () {
                          return ue(t, e, r);
                        });
                },
                set: function (t, n, r) {
                  var o,
                    i = Gt(t),
                    a = !g.scrollboxSize() && "absolute" === i.position,
                    s =
                      (a || r) && "border-box" === T.css(t, "boxSizing", !1, i),
                    l = r ? ce(t, e, r, s, i) : 0;
                  return (
                    s &&
                      a &&
                      (l -= Math.ceil(
                        t["offset" + e[0].toUpperCase() + e.slice(1)] -
                          parseFloat(i[e]) -
                          ce(t, e, "border", !1, i) -
                          0.5
                      )),
                    l &&
                      (o = pt.exec(n)) &&
                      "px" !== (o[3] || "px") &&
                      ((t.style[e] = n), (n = T.css(t, e))),
                    le(0, n, l)
                  );
                },
              };
            }),
            (T.cssHooks.marginLeft = te(g.reliableMarginLeft, function (t, e) {
              if (e)
                return (
                  (parseFloat(Qt(t, "marginLeft")) ||
                    t.getBoundingClientRect().left -
                      Yt(t, { marginLeft: 0 }, function () {
                        return t.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            T.each(
              { margin: "", padding: "", border: "Width" },
              function (t, e) {
                (T.cssHooks[t + e] = {
                  expand: function (n) {
                    for (
                      var r = 0,
                        o = {},
                        i = "string" == typeof n ? n.split(" ") : [n];
                      r < 4;
                      r++
                    )
                      o[t + ht[r] + e] = i[r] || i[r - 2] || i[0];
                    return o;
                  },
                }),
                  "margin" !== t && (T.cssHooks[t + e].set = le);
              }
            ),
            T.fn.extend({
              css: function (t, e) {
                return tt(
                  this,
                  function (t, e, n) {
                    var r,
                      o,
                      i = {},
                      a = 0;
                    if (Array.isArray(e)) {
                      for (r = Gt(t), o = e.length; a < o; a++)
                        i[e[a]] = T.css(t, e[a], !1, r);
                      return i;
                    }
                    return void 0 !== n ? T.style(t, e, n) : T.css(t, e);
                  },
                  t,
                  e,
                  arguments.length > 1
                );
              },
            }),
            (T.Tween = de),
            (de.prototype = {
              constructor: de,
              init: function (t, e, n, r, o, i) {
                (this.elem = t),
                  (this.prop = n),
                  (this.easing = o || T.easing._default),
                  (this.options = e),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = i || (T.cssNumber[n] ? "" : "px"));
              },
              cur: function () {
                var t = de.propHooks[this.prop];
                return t && t.get
                  ? t.get(this)
                  : de.propHooks._default.get(this);
              },
              run: function (t) {
                var e,
                  n = de.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = e =
                        T.easing[this.easing](
                          t,
                          this.options.duration * t,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = e = t),
                  (this.now = (this.end - this.start) * e + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : de.propHooks._default.set(this),
                  this
                );
              },
            }),
            (de.prototype.init.prototype = de.prototype),
            (de.propHooks = {
              _default: {
                get: function (t) {
                  var e;
                  return 1 !== t.elem.nodeType ||
                    (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                    ? t.elem[t.prop]
                    : (e = T.css(t.elem, t.prop, "")) && "auto" !== e
                    ? e
                    : 0;
                },
                set: function (t) {
                  T.fx.step[t.prop]
                    ? T.fx.step[t.prop](t)
                    : 1 !== t.elem.nodeType ||
                      (!T.cssHooks[t.prop] && null == t.elem.style[oe(t.prop)])
                    ? (t.elem[t.prop] = t.now)
                    : T.style(t.elem, t.prop, t.now + t.unit);
                },
              },
            }),
            (de.propHooks.scrollTop = de.propHooks.scrollLeft =
              {
                set: function (t) {
                  t.elem.nodeType &&
                    t.elem.parentNode &&
                    (t.elem[t.prop] = t.now);
                },
              }),
            (T.easing = {
              linear: function (t) {
                return t;
              },
              swing: function (t) {
                return 0.5 - Math.cos(t * Math.PI) / 2;
              },
              _default: "swing",
            }),
            (T.fx = de.prototype.init),
            (T.fx.step = {});
          var fe,
            pe,
            he = /^(?:toggle|show|hide)$/,
            me = /queueHooks$/;
          function ge() {
            pe &&
              (!1 === y.hidden && r.requestAnimationFrame
                ? r.requestAnimationFrame(ge)
                : r.setTimeout(ge, T.fx.interval),
              T.fx.tick());
          }
          function ve() {
            return (
              r.setTimeout(function () {
                fe = void 0;
              }),
              (fe = Date.now())
            );
          }
          function be(t, e) {
            var n,
              r = 0,
              o = { height: t };
            for (e = e ? 1 : 0; r < 4; r += 2 - e)
              o["margin" + (n = ht[r])] = o["padding" + n] = t;
            return e && (o.opacity = o.width = t), o;
          }
          function ye(t, e, n) {
            for (
              var r,
                o = (xe.tweeners[e] || []).concat(xe.tweeners["*"]),
                i = 0,
                a = o.length;
              i < a;
              i++
            )
              if ((r = o[i].call(n, e, t))) return r;
          }
          function xe(t, e, n) {
            var r,
              o,
              i = 0,
              a = xe.prefilters.length,
              s = T.Deferred().always(function () {
                delete l.elem;
              }),
              l = function () {
                if (o) return !1;
                for (
                  var e = fe || ve(),
                    n = Math.max(0, c.startTime + c.duration - e),
                    r = 1 - (n / c.duration || 0),
                    i = 0,
                    a = c.tweens.length;
                  i < a;
                  i++
                )
                  c.tweens[i].run(r);
                return (
                  s.notifyWith(t, [c, r, n]),
                  r < 1 && a
                    ? n
                    : (a || s.notifyWith(t, [c, 1, 0]),
                      s.resolveWith(t, [c]),
                      !1)
                );
              },
              c = s.promise({
                elem: t,
                props: T.extend({}, e),
                opts: T.extend(
                  !0,
                  { specialEasing: {}, easing: T.easing._default },
                  n
                ),
                originalProperties: e,
                originalOptions: n,
                startTime: fe || ve(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                  var r = T.Tween(
                    t,
                    c.opts,
                    e,
                    n,
                    c.opts.specialEasing[e] || c.opts.easing
                  );
                  return c.tweens.push(r), r;
                },
                stop: function (e) {
                  var n = 0,
                    r = e ? c.tweens.length : 0;
                  if (o) return this;
                  for (o = !0; n < r; n++) c.tweens[n].run(1);
                  return (
                    e
                      ? (s.notifyWith(t, [c, 1, 0]), s.resolveWith(t, [c, e]))
                      : s.rejectWith(t, [c, e]),
                    this
                  );
                },
              }),
              u = c.props;
            for (
              !(function (t, e) {
                var n, r, o, i, a;
                for (n in t)
                  if (
                    ((o = e[(r = ot(n))]),
                    (i = t[n]),
                    Array.isArray(i) && ((o = i[1]), (i = t[n] = i[0])),
                    n !== r && ((t[r] = i), delete t[n]),
                    (a = T.cssHooks[r]) && ("expand" in a))
                  )
                    for (n in ((i = a.expand(i)), delete t[r], i))
                      (n in t) || ((t[n] = i[n]), (e[n] = o));
                  else e[r] = o;
              })(u, c.opts.specialEasing);
              i < a;
              i++
            )
              if ((r = xe.prefilters[i].call(c, t, u, c.opts)))
                return (
                  v(r.stop) &&
                    (T._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)),
                  r
                );
            return (
              T.map(u, ye, c),
              v(c.opts.start) && c.opts.start.call(t, c),
              c
                .progress(c.opts.progress)
                .done(c.opts.done, c.opts.complete)
                .fail(c.opts.fail)
                .always(c.opts.always),
              T.fx.timer(
                T.extend(l, { elem: t, anim: c, queue: c.opts.queue })
              ),
              c
            );
          }
          (T.Animation = T.extend(xe, {
            tweeners: {
              "*": [
                function (t, e) {
                  var n = this.createTween(t, e);
                  return yt(n.elem, t, pt.exec(e), n), n;
                },
              ],
            },
            tweener: function (t, e) {
              v(t) ? ((e = t), (t = ["*"])) : (t = t.match(V));
              for (var n, r = 0, o = t.length; r < o; r++)
                (n = t[r]),
                  (xe.tweeners[n] = xe.tweeners[n] || []),
                  xe.tweeners[n].unshift(e);
            },
            prefilters: [
              function (t, e, n) {
                var r,
                  o,
                  i,
                  a,
                  s,
                  l,
                  c,
                  u,
                  d = "width" in e || "height" in e,
                  f = this,
                  p = {},
                  h = t.style,
                  m = t.nodeType && bt(t),
                  g = st.get(t, "fxshow");
                for (r in (n.queue ||
                  (null == (a = T._queueHooks(t, "fx")).unqueued &&
                    ((a.unqueued = 0),
                    (s = a.empty.fire),
                    (a.empty.fire = function () {
                      a.unqueued || s();
                    })),
                  a.unqueued++,
                  f.always(function () {
                    f.always(function () {
                      a.unqueued--, T.queue(t, "fx").length || a.empty.fire();
                    });
                  })),
                e))
                  if (((o = e[r]), he.test(o))) {
                    if (
                      (delete e[r],
                      (i = i || "toggle" === o),
                      o === (m ? "hide" : "show"))
                    ) {
                      if ("show" !== o || !g || void 0 === g[r]) continue;
                      m = !0;
                    }
                    p[r] = (g && g[r]) || T.style(t, r);
                  }
                if ((l = !T.isEmptyObject(e)) || !T.isEmptyObject(p))
                  for (r in (d &&
                    1 === t.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (c = g && g.display) && (c = st.get(t, "display")),
                    "none" === (u = T.css(t, "display")) &&
                      (c
                        ? (u = c)
                        : (St([t], !0),
                          (c = t.style.display || c),
                          (u = T.css(t, "display")),
                          St([t]))),
                    ("inline" === u || ("inline-block" === u && null != c)) &&
                      "none" === T.css(t, "float") &&
                      (l ||
                        (f.done(function () {
                          h.display = c;
                        }),
                        null == c &&
                          ((u = h.display), (c = "none" === u ? "" : u))),
                      (h.display = "inline-block"))),
                  n.overflow &&
                    ((h.overflow = "hidden"),
                    f.always(function () {
                      (h.overflow = n.overflow[0]),
                        (h.overflowX = n.overflow[1]),
                        (h.overflowY = n.overflow[2]);
                    })),
                  (l = !1),
                  p))
                    l ||
                      (g
                        ? "hidden" in g && (m = g.hidden)
                        : (g = st.access(t, "fxshow", { display: c })),
                      i && (g.hidden = !m),
                      m && St([t], !0),
                      f.done(function () {
                        for (r in (m || St([t]), st.remove(t, "fxshow"), p))
                          T.style(t, r, p[r]);
                      })),
                      (l = ye(m ? g[r] : 0, r, f)),
                      r in g ||
                        ((g[r] = l.start),
                        m && ((l.end = l.start), (l.start = 0)));
              },
            ],
            prefilter: function (t, e) {
              e ? xe.prefilters.unshift(t) : xe.prefilters.push(t);
            },
          })),
            (T.speed = function (t, e, n) {
              var r =
                t && "object" == typeof t
                  ? T.extend({}, t)
                  : {
                      complete: n || (!n && e) || (v(t) && t),
                      duration: t,
                      easing: (n && e) || (e && !v(e) && e),
                    };
              return (
                T.fx.off
                  ? (r.duration = 0)
                  : "number" != typeof r.duration &&
                    (r.duration in T.fx.speeds
                      ? (r.duration = T.fx.speeds[r.duration])
                      : (r.duration = T.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                (r.old = r.complete),
                (r.complete = function () {
                  v(r.old) && r.old.call(this),
                    r.queue && T.dequeue(this, r.queue);
                }),
                r
              );
            }),
            T.fn.extend({
              fadeTo: function (t, e, n, r) {
                return this.filter(bt)
                  .css("opacity", 0)
                  .show()
                  .end()
                  .animate({ opacity: e }, t, n, r);
              },
              animate: function (t, e, n, r) {
                var o = T.isEmptyObject(t),
                  i = T.speed(e, n, r),
                  a = function () {
                    var e = xe(this, T.extend({}, t), i);
                    (o || st.get(this, "finish")) && e.stop(!0);
                  };
                return (
                  (a.finish = a),
                  o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
                );
              },
              stop: function (t, e, n) {
                var r = function (t) {
                  var e = t.stop;
                  delete t.stop, e(n);
                };
                return (
                  "string" != typeof t && ((n = e), (e = t), (t = void 0)),
                  e && this.queue(t || "fx", []),
                  this.each(function () {
                    var e = !0,
                      o = null != t && t + "queueHooks",
                      i = T.timers,
                      a = st.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else
                      for (o in a) a[o] && a[o].stop && me.test(o) && r(a[o]);
                    for (o = i.length; o--; )
                      i[o].elem !== this ||
                        (null != t && i[o].queue !== t) ||
                        (i[o].anim.stop(n), (e = !1), i.splice(o, 1));
                    (!e && n) || T.dequeue(this, t);
                  })
                );
              },
              finish: function (t) {
                return (
                  !1 !== t && (t = t || "fx"),
                  this.each(function () {
                    var e,
                      n = st.get(this),
                      r = n[t + "queue"],
                      o = n[t + "queueHooks"],
                      i = T.timers,
                      a = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        T.queue(this, t, []),
                        o && o.stop && o.stop.call(this, !0),
                        e = i.length;
                      e--;

                    )
                      i[e].elem === this &&
                        i[e].queue === t &&
                        (i[e].anim.stop(!0), i.splice(e, 1));
                    for (e = 0; e < a; e++)
                      r[e] && r[e].finish && r[e].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            T.each(["toggle", "show", "hide"], function (t, e) {
              var n = T.fn[e];
              T.fn[e] = function (t, r, o) {
                return null == t || "boolean" == typeof t
                  ? n.apply(this, arguments)
                  : this.animate(be(e, !0), t, r, o);
              };
            }),
            T.each(
              {
                slideDown: be("show"),
                slideUp: be("hide"),
                slideToggle: be("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
              },
              function (t, e) {
                T.fn[t] = function (t, n, r) {
                  return this.animate(e, t, n, r);
                };
              }
            ),
            (T.timers = []),
            (T.fx.tick = function () {
              var t,
                e = 0,
                n = T.timers;
              for (fe = Date.now(); e < n.length; e++)
                (t = n[e])() || n[e] !== t || n.splice(e--, 1);
              n.length || T.fx.stop(), (fe = void 0);
            }),
            (T.fx.timer = function (t) {
              T.timers.push(t), T.fx.start();
            }),
            (T.fx.interval = 13),
            (T.fx.start = function () {
              pe || ((pe = !0), ge());
            }),
            (T.fx.stop = function () {
              pe = null;
            }),
            (T.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (T.fn.delay = function (t, e) {
              return (
                (t = (T.fx && T.fx.speeds[t]) || t),
                (e = e || "fx"),
                this.queue(e, function (e, n) {
                  var o = r.setTimeout(e, t);
                  n.stop = function () {
                    r.clearTimeout(o);
                  };
                })
              );
            }),
            (function () {
              var t = y.createElement("input"),
                e = y
                  .createElement("select")
                  .appendChild(y.createElement("option"));
              (t.type = "checkbox"),
                (g.checkOn = "" !== t.value),
                (g.optSelected = e.selected),
                ((t = y.createElement("input")).value = "t"),
                (t.type = "radio"),
                (g.radioValue = "t" === t.value);
            })();
          var we,
            Se = T.expr.attrHandle;
          T.fn.extend({
            attr: function (t, e) {
              return tt(this, T.attr, t, e, arguments.length > 1);
            },
            removeAttr: function (t) {
              return this.each(function () {
                T.removeAttr(this, t);
              });
            },
          }),
            T.extend({
              attr: function (t, e, n) {
                var r,
                  o,
                  i = t.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return void 0 === t.getAttribute
                    ? T.prop(t, e, n)
                    : ((1 === i && T.isXMLDoc(t)) ||
                        (o =
                          T.attrHooks[e.toLowerCase()] ||
                          (T.expr.match.bool.test(e) ? we : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void T.removeAttr(t, e)
                          : o && "set" in o && void 0 !== (r = o.set(t, n, e))
                          ? r
                          : (t.setAttribute(e, n + ""), n)
                        : o && "get" in o && null !== (r = o.get(t, e))
                        ? r
                        : null == (r = T.find.attr(t, e))
                        ? void 0
                        : r);
              },
              attrHooks: {
                type: {
                  set: function (t, e) {
                    if (!g.radioValue && "radio" === e && I(t, "input")) {
                      var n = t.value;
                      return t.setAttribute("type", e), n && (t.value = n), e;
                    }
                  },
                },
              },
              removeAttr: function (t, e) {
                var n,
                  r = 0,
                  o = e && e.match(V);
                if (o && 1 === t.nodeType)
                  for (; (n = o[r++]); ) t.removeAttribute(n);
              },
            }),
            (we = {
              set: function (t, e, n) {
                return !1 === e ? T.removeAttr(t, n) : t.setAttribute(n, n), n;
              },
            }),
            T.each(T.expr.match.bool.source.match(/\w+/g), function (t, e) {
              var n = Se[e] || T.find.attr;
              Se[e] = function (t, e, r) {
                var o,
                  i,
                  a = e.toLowerCase();
                return (
                  r ||
                    ((i = Se[a]),
                    (Se[a] = o),
                    (o = null != n(t, e, r) ? a : null),
                    (Se[a] = i)),
                  o
                );
              };
            });
          var Ce = /^(?:input|select|textarea|button)$/i,
            _e = /^(?:a|area)$/i;
          function Te(t) {
            return (t.match(V) || []).join(" ");
          }
          function De(t) {
            return (t.getAttribute && t.getAttribute("class")) || "";
          }
          function Ie(t) {
            return Array.isArray(t)
              ? t
              : ("string" == typeof t && t.match(V)) || [];
          }
          T.fn.extend({
            prop: function (t, e) {
              return tt(this, T.prop, t, e, arguments.length > 1);
            },
            removeProp: function (t) {
              return this.each(function () {
                delete this[T.propFix[t] || t];
              });
            },
          }),
            T.extend({
              prop: function (t, e, n) {
                var r,
                  o,
                  i = t.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return (
                    (1 === i && T.isXMLDoc(t)) ||
                      ((e = T.propFix[e] || e), (o = T.propHooks[e])),
                    void 0 !== n
                      ? o && "set" in o && void 0 !== (r = o.set(t, n, e))
                        ? r
                        : (t[e] = n)
                      : o && "get" in o && null !== (r = o.get(t, e))
                      ? r
                      : t[e]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (t) {
                    var e = T.find.attr(t, "tabindex");
                    return e
                      ? parseInt(e, 10)
                      : Ce.test(t.nodeName) || (_e.test(t.nodeName) && t.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            g.optSelected ||
              (T.propHooks.selected = {
                get: function (t) {
                  var e = t.parentNode;
                  return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function (t) {
                  var e = t.parentNode;
                  e &&
                    (e.selectedIndex,
                    e.parentNode && e.parentNode.selectedIndex);
                },
              }),
            T.each(
              [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
              ],
              function () {
                T.propFix[this.toLowerCase()] = this;
              }
            ),
            T.fn.extend({
              addClass: function (t) {
                var e, n, r, o, i, a;
                return v(t)
                  ? this.each(function (e) {
                      T(this).addClass(t.call(this, e, De(this)));
                    })
                  : (e = Ie(t)).length
                  ? this.each(function () {
                      if (
                        ((r = De(this)),
                        (n = 1 === this.nodeType && " " + Te(r) + " "))
                      ) {
                        for (i = 0; i < e.length; i++)
                          (o = e[i]),
                            n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        (a = Te(n)), r !== a && this.setAttribute("class", a);
                      }
                    })
                  : this;
              },
              removeClass: function (t) {
                var e, n, r, o, i, a;
                return v(t)
                  ? this.each(function (e) {
                      T(this).removeClass(t.call(this, e, De(this)));
                    })
                  : arguments.length
                  ? (e = Ie(t)).length
                    ? this.each(function () {
                        if (
                          ((r = De(this)),
                          (n = 1 === this.nodeType && " " + Te(r) + " "))
                        ) {
                          for (i = 0; i < e.length; i++)
                            for (o = e[i]; n.indexOf(" " + o + " ") > -1; )
                              n = n.replace(" " + o + " ", " ");
                          (a = Te(n)), r !== a && this.setAttribute("class", a);
                        }
                      })
                    : this
                  : this.attr("class", "");
              },
              toggleClass: function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  a = typeof t,
                  s = "string" === a || Array.isArray(t);
                return v(t)
                  ? this.each(function (n) {
                      T(this).toggleClass(t.call(this, n, De(this), e), e);
                    })
                  : "boolean" == typeof e && s
                  ? e
                    ? this.addClass(t)
                    : this.removeClass(t)
                  : ((n = Ie(t)),
                    this.each(function () {
                      if (s)
                        for (i = T(this), o = 0; o < n.length; o++)
                          (r = n[o]),
                            i.hasClass(r) ? i.removeClass(r) : i.addClass(r);
                      else
                        (void 0 !== t && "boolean" !== a) ||
                          ((r = De(this)) && st.set(this, "__className__", r),
                          this.setAttribute &&
                            this.setAttribute(
                              "class",
                              r || !1 === t
                                ? ""
                                : st.get(this, "__className__") || ""
                            ));
                    }));
              },
              hasClass: function (t) {
                var e,
                  n,
                  r = 0;
                for (e = " " + t + " "; (n = this[r++]); )
                  if (
                    1 === n.nodeType &&
                    (" " + Te(De(n)) + " ").indexOf(e) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var Ae = /\r/g;
          T.fn.extend({
            val: function (t) {
              var e,
                n,
                r,
                o = this[0];
              return arguments.length
                ? ((r = v(t)),
                  this.each(function (n) {
                    var o;
                    1 === this.nodeType &&
                      (null == (o = r ? t.call(this, n, T(this).val()) : t)
                        ? (o = "")
                        : "number" == typeof o
                        ? (o += "")
                        : Array.isArray(o) &&
                          (o = T.map(o, function (t) {
                            return null == t ? "" : t + "";
                          })),
                      ((e =
                        T.valHooks[this.type] ||
                        T.valHooks[this.nodeName.toLowerCase()]) &&
                        "set" in e &&
                        void 0 !== e.set(this, o, "value")) ||
                        (this.value = o));
                  }))
                : o
                ? (e =
                    T.valHooks[o.type] ||
                    T.valHooks[o.nodeName.toLowerCase()]) &&
                  "get" in e &&
                  void 0 !== (n = e.get(o, "value"))
                  ? n
                  : "string" == typeof (n = o.value)
                  ? n.replace(Ae, "")
                  : null == n
                  ? ""
                  : n
                : void 0;
            },
          }),
            T.extend({
              valHooks: {
                option: {
                  get: function (t) {
                    var e = T.find.attr(t, "value");
                    return null != e ? e : Te(T.text(t));
                  },
                },
                select: {
                  get: function (t) {
                    var e,
                      n,
                      r,
                      o = t.options,
                      i = t.selectedIndex,
                      a = "select-one" === t.type,
                      s = a ? null : [],
                      l = a ? i + 1 : o.length;
                    for (r = i < 0 ? l : a ? i : 0; r < l; r++)
                      if (
                        ((n = o[r]).selected || r === i) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !I(n.parentNode, "optgroup"))
                      ) {
                        if (((e = T(n).val()), a)) return e;
                        s.push(e);
                      }
                    return s;
                  },
                  set: function (t, e) {
                    for (
                      var n, r, o = t.options, i = T.makeArray(e), a = o.length;
                      a--;

                    )
                      ((r = o[a]).selected =
                        T.inArray(T.valHooks.option.get(r), i) > -1) &&
                        (n = !0);
                    return n || (t.selectedIndex = -1), i;
                  },
                },
              },
            }),
            T.each(["radio", "checkbox"], function () {
              (T.valHooks[this] = {
                set: function (t, e) {
                  if (Array.isArray(e))
                    return (t.checked = T.inArray(T(t).val(), e) > -1);
                },
              }),
                g.checkOn ||
                  (T.valHooks[this].get = function (t) {
                    return null === t.getAttribute("value") ? "on" : t.value;
                  });
            });
          var Fe = r.location,
            ke = { guid: Date.now() },
            Ne = /\?/;
          T.parseXML = function (t) {
            var e, n;
            if (!t || "string" != typeof t) return null;
            try {
              e = new r.DOMParser().parseFromString(t, "text/xml");
            } catch (t) {}
            return (
              (n = e && e.getElementsByTagName("parsererror")[0]),
              (e && !n) ||
                T.error(
                  "Invalid XML: " +
                    (n
                      ? T.map(n.childNodes, function (t) {
                          return t.textContent;
                        }).join("\n")
                      : t)
                ),
              e
            );
          };
          var Le = /^(?:focusinfocus|focusoutblur)$/,
            He = function (t) {
              t.stopPropagation();
            };
          T.extend(T.event, {
            trigger: function (t, e, n, o) {
              var i,
                a,
                s,
                l,
                c,
                u,
                d,
                f,
                h = [n || y],
                m = p.call(t, "type") ? t.type : t,
                g = p.call(t, "namespace") ? t.namespace.split(".") : [];
              if (
                ((a = f = s = n = n || y),
                3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !Le.test(m + T.event.triggered) &&
                  (m.indexOf(".") > -1 &&
                    ((g = m.split(".")), (m = g.shift()), g.sort()),
                  (c = m.indexOf(":") < 0 && "on" + m),
                  ((t = t[T.expando]
                    ? t
                    : new T.Event(m, "object" == typeof t && t)).isTrigger = o
                    ? 2
                    : 3),
                  (t.namespace = g.join(".")),
                  (t.rnamespace = t.namespace
                    ? new RegExp(
                        "(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      )
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = n),
                  (e = null == e ? [t] : T.makeArray(e, [t])),
                  (d = T.event.special[m] || {}),
                  o || !d.trigger || !1 !== d.trigger.apply(n, e)))
              ) {
                if (!o && !d.noBubble && !b(n)) {
                  for (
                    l = d.delegateType || m,
                      Le.test(l + m) || (a = a.parentNode);
                    a;
                    a = a.parentNode
                  )
                    h.push(a), (s = a);
                  s === (n.ownerDocument || y) &&
                    h.push(s.defaultView || s.parentWindow || r);
                }
                for (i = 0; (a = h[i++]) && !t.isPropagationStopped(); )
                  (f = a),
                    (t.type = i > 1 ? l : d.bindType || m),
                    (u =
                      (st.get(a, "events") || Object.create(null))[t.type] &&
                      st.get(a, "handle")) && u.apply(a, e),
                    (u = c && a[c]) &&
                      u.apply &&
                      it(a) &&
                      ((t.result = u.apply(a, e)),
                      !1 === t.result && t.preventDefault());
                return (
                  (t.type = m),
                  o ||
                    t.isDefaultPrevented() ||
                    (d._default && !1 !== d._default.apply(h.pop(), e)) ||
                    !it(n) ||
                    (c &&
                      v(n[m]) &&
                      !b(n) &&
                      ((s = n[c]) && (n[c] = null),
                      (T.event.triggered = m),
                      t.isPropagationStopped() && f.addEventListener(m, He),
                      n[m](),
                      t.isPropagationStopped() && f.removeEventListener(m, He),
                      (T.event.triggered = void 0),
                      s && (n[c] = s))),
                  t.result
                );
              }
            },
            simulate: function (t, e, n) {
              var r = T.extend(new T.Event(), n, { type: t, isSimulated: !0 });
              T.event.trigger(r, null, e);
            },
          }),
            T.fn.extend({
              trigger: function (t, e) {
                return this.each(function () {
                  T.event.trigger(t, e, this);
                });
              },
              triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return T.event.trigger(t, e, n, !0);
              },
            });
          var je = /\[\]$/,
            Ee = /\r?\n/g,
            Pe = /^(?:submit|button|image|reset|file)$/i,
            Be = /^(?:input|select|textarea|keygen)/i;
          function Oe(t, e, n, r) {
            var o;
            if (Array.isArray(e))
              T.each(e, function (e, o) {
                n || je.test(t)
                  ? r(t, o)
                  : Oe(
                      t +
                        "[" +
                        ("object" == typeof o && null != o ? e : "") +
                        "]",
                      o,
                      n,
                      r
                    );
              });
            else if (n || "object" !== S(e)) r(t, e);
            else for (o in e) Oe(t + "[" + o + "]", e[o], n, r);
          }
          (T.param = function (t, e) {
            var n,
              r = [],
              o = function (t, e) {
                var n = v(e) ? e() : e;
                r[r.length] =
                  encodeURIComponent(t) +
                  "=" +
                  encodeURIComponent(null == n ? "" : n);
              };
            if (null == t) return "";
            if (Array.isArray(t) || (t.jquery && !T.isPlainObject(t)))
              T.each(t, function () {
                o(this.name, this.value);
              });
            else for (n in t) Oe(n, t[n], e, o);
            return r.join("&");
          }),
            T.fn.extend({
              serialize: function () {
                return T.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var t = T.prop(this, "elements");
                  return t ? T.makeArray(t) : this;
                })
                  .filter(function () {
                    var t = this.type;
                    return (
                      this.name &&
                      !T(this).is(":disabled") &&
                      Be.test(this.nodeName) &&
                      !Pe.test(t) &&
                      (this.checked || !Tt.test(t))
                    );
                  })
                  .map(function (t, e) {
                    var n = T(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? T.map(n, function (t) {
                          return { name: e.name, value: t.replace(Ee, "\r\n") };
                        })
                      : { name: e.name, value: n.replace(Ee, "\r\n") };
                  })
                  .get();
              },
            });
          var Re = /%20/g,
            Me = /#.*$/,
            We = /([?&])_=[^&]*/,
            qe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            ze = /^(?:GET|HEAD)$/,
            $e = /^\/\//,
            Ue = {},
            Xe = {},
            Ve = "*/".concat("*"),
            Je = y.createElement("a");
          function Ke(t) {
            return function (e, n) {
              "string" != typeof e && ((n = e), (e = "*"));
              var r,
                o = 0,
                i = e.toLowerCase().match(V) || [];
              if (v(n))
                for (; (r = i[o++]); )
                  "+" === r[0]
                    ? ((r = r.slice(1) || "*"), (t[r] = t[r] || []).unshift(n))
                    : (t[r] = t[r] || []).push(n);
            };
          }
          function Ge(t, e, n, r) {
            var o = {},
              i = t === Xe;
            function a(s) {
              var l;
              return (
                (o[s] = !0),
                T.each(t[s] || [], function (t, s) {
                  var c = s(e, n, r);
                  return "string" != typeof c || i || o[c]
                    ? i
                      ? !(l = c)
                      : void 0
                    : (e.dataTypes.unshift(c), a(c), !1);
                }),
                l
              );
            }
            return a(e.dataTypes[0]) || (!o["*"] && a("*"));
          }
          function Ye(t, e) {
            var n,
              r,
              o = T.ajaxSettings.flatOptions || {};
            for (n in e)
              void 0 !== e[n] && ((o[n] ? t : r || (r = {}))[n] = e[n]);
            return r && T.extend(!0, t, r), t;
          }
          (Je.href = Fe.href),
            T.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Fe.href,
                type: "GET",
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    Fe.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": Ve,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: "responseXML",
                  text: "responseText",
                  json: "responseJSON",
                },
                converters: {
                  "* text": String,
                  "text html": !0,
                  "text json": JSON.parse,
                  "text xml": T.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (t, e) {
                return e ? Ye(Ye(t, T.ajaxSettings), e) : Ye(T.ajaxSettings, t);
              },
              ajaxPrefilter: Ke(Ue),
              ajaxTransport: Ke(Xe),
              ajax: function (t, e) {
                "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
                var n,
                  o,
                  i,
                  a,
                  s,
                  l,
                  c,
                  u,
                  d,
                  f,
                  p = T.ajaxSetup({}, e),
                  h = p.context || p,
                  m = p.context && (h.nodeType || h.jquery) ? T(h) : T.event,
                  g = T.Deferred(),
                  v = T.Callbacks("once memory"),
                  b = p.statusCode || {},
                  x = {},
                  w = {},
                  S = "canceled",
                  C = {
                    readyState: 0,
                    getResponseHeader: function (t) {
                      var e;
                      if (c) {
                        if (!a)
                          for (a = {}; (e = qe.exec(i)); )
                            a[e[1].toLowerCase() + " "] = (
                              a[e[1].toLowerCase() + " "] || []
                            ).concat(e[2]);
                        e = a[t.toLowerCase() + " "];
                      }
                      return null == e ? null : e.join(", ");
                    },
                    getAllResponseHeaders: function () {
                      return c ? i : null;
                    },
                    setRequestHeader: function (t, e) {
                      return (
                        null == c &&
                          ((t = w[t.toLowerCase()] = w[t.toLowerCase()] || t),
                          (x[t] = e)),
                        this
                      );
                    },
                    overrideMimeType: function (t) {
                      return null == c && (p.mimeType = t), this;
                    },
                    statusCode: function (t) {
                      var e;
                      if (t)
                        if (c) C.always(t[C.status]);
                        else for (e in t) b[e] = [b[e], t[e]];
                      return this;
                    },
                    abort: function (t) {
                      var e = t || S;
                      return n && n.abort(e), _(0, e), this;
                    },
                  };
                if (
                  (g.promise(C),
                  (p.url = ((t || p.url || Fe.href) + "").replace(
                    $e,
                    Fe.protocol + "//"
                  )),
                  (p.type = e.method || e.type || p.method || p.type),
                  (p.dataTypes = (p.dataType || "*").toLowerCase().match(V) || [
                    "",
                  ]),
                  null == p.crossDomain)
                ) {
                  l = y.createElement("a");
                  try {
                    (l.href = p.url),
                      (l.href = l.href),
                      (p.crossDomain =
                        Je.protocol + "//" + Je.host !=
                        l.protocol + "//" + l.host);
                  } catch (t) {
                    p.crossDomain = !0;
                  }
                }
                if (
                  (p.data &&
                    p.processData &&
                    "string" != typeof p.data &&
                    (p.data = T.param(p.data, p.traditional)),
                  Ge(Ue, p, e, C),
                  c)
                )
                  return C;
                for (d in ((u = T.event && p.global) &&
                  0 == T.active++ &&
                  T.event.trigger("ajaxStart"),
                (p.type = p.type.toUpperCase()),
                (p.hasContent = !ze.test(p.type)),
                (o = p.url.replace(Me, "")),
                p.hasContent
                  ? p.data &&
                    p.processData &&
                    0 ===
                      (p.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    (p.data = p.data.replace(Re, "+"))
                  : ((f = p.url.slice(o.length)),
                    p.data &&
                      (p.processData || "string" == typeof p.data) &&
                      ((o += (Ne.test(o) ? "&" : "?") + p.data), delete p.data),
                    !1 === p.cache &&
                      ((o = o.replace(We, "$1")),
                      (f = (Ne.test(o) ? "&" : "?") + "_=" + ke.guid++ + f)),
                    (p.url = o + f)),
                p.ifModified &&
                  (T.lastModified[o] &&
                    C.setRequestHeader("If-Modified-Since", T.lastModified[o]),
                  T.etag[o] && C.setRequestHeader("If-None-Match", T.etag[o])),
                ((p.data && p.hasContent && !1 !== p.contentType) ||
                  e.contentType) &&
                  C.setRequestHeader("Content-Type", p.contentType),
                C.setRequestHeader(
                  "Accept",
                  p.dataTypes[0] && p.accepts[p.dataTypes[0]]
                    ? p.accepts[p.dataTypes[0]] +
                        ("*" !== p.dataTypes[0] ? ", " + Ve + "; q=0.01" : "")
                    : p.accepts["*"]
                ),
                p.headers))
                  C.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (!1 === p.beforeSend.call(h, C, p) || c))
                  return C.abort();
                if (
                  ((S = "abort"),
                  v.add(p.complete),
                  C.done(p.success),
                  C.fail(p.error),
                  (n = Ge(Xe, p, e, C)))
                ) {
                  if (
                    ((C.readyState = 1), u && m.trigger("ajaxSend", [C, p]), c)
                  )
                    return C;
                  p.async &&
                    p.timeout > 0 &&
                    (s = r.setTimeout(function () {
                      C.abort("timeout");
                    }, p.timeout));
                  try {
                    (c = !1), n.send(x, _);
                  } catch (t) {
                    if (c) throw t;
                    _(-1, t);
                  }
                } else _(-1, "No Transport");
                function _(t, e, a, l) {
                  var d,
                    f,
                    y,
                    x,
                    w,
                    S = e;
                  c ||
                    ((c = !0),
                    s && r.clearTimeout(s),
                    (n = void 0),
                    (i = l || ""),
                    (C.readyState = t > 0 ? 4 : 0),
                    (d = (t >= 200 && t < 300) || 304 === t),
                    a &&
                      (x = (function (t, e, n) {
                        for (
                          var r, o, i, a, s = t.contents, l = t.dataTypes;
                          "*" === l[0];

                        )
                          l.shift(),
                            void 0 === r &&
                              (r =
                                t.mimeType ||
                                e.getResponseHeader("Content-Type"));
                        if (r)
                          for (o in s)
                            if (s[o] && s[o].test(r)) {
                              l.unshift(o);
                              break;
                            }
                        if (l[0] in n) i = l[0];
                        else {
                          for (o in n) {
                            if (!l[0] || t.converters[o + " " + l[0]]) {
                              i = o;
                              break;
                            }
                            a || (a = o);
                          }
                          i = i || a;
                        }
                        if (i) return i !== l[0] && l.unshift(i), n[i];
                      })(p, C, a)),
                    !d &&
                      T.inArray("script", p.dataTypes) > -1 &&
                      T.inArray("json", p.dataTypes) < 0 &&
                      (p.converters["text script"] = function () {}),
                    (x = (function (t, e, n, r) {
                      var o,
                        i,
                        a,
                        s,
                        l,
                        c = {},
                        u = t.dataTypes.slice();
                      if (u[1])
                        for (a in t.converters)
                          c[a.toLowerCase()] = t.converters[a];
                      for (i = u.shift(); i; )
                        if (
                          (t.responseFields[i] && (n[t.responseFields[i]] = e),
                          !l &&
                            r &&
                            t.dataFilter &&
                            (e = t.dataFilter(e, t.dataType)),
                          (l = i),
                          (i = u.shift()))
                        )
                          if ("*" === i) i = l;
                          else if ("*" !== l && l !== i) {
                            if (!(a = c[l + " " + i] || c["* " + i]))
                              for (o in c)
                                if (
                                  (s = o.split(" "))[1] === i &&
                                  (a = c[l + " " + s[0]] || c["* " + s[0]])
                                ) {
                                  !0 === a
                                    ? (a = c[o])
                                    : !0 !== c[o] &&
                                      ((i = s[0]), u.unshift(s[1]));
                                  break;
                                }
                            if (!0 !== a)
                              if (a && t.throws) e = a(e);
                              else
                                try {
                                  e = a(e);
                                } catch (t) {
                                  return {
                                    state: "parsererror",
                                    error: a
                                      ? t
                                      : "No conversion from " + l + " to " + i,
                                  };
                                }
                          }
                      return { state: "success", data: e };
                    })(p, x, C, d)),
                    d
                      ? (p.ifModified &&
                          ((w = C.getResponseHeader("Last-Modified")) &&
                            (T.lastModified[o] = w),
                          (w = C.getResponseHeader("etag")) && (T.etag[o] = w)),
                        204 === t || "HEAD" === p.type
                          ? (S = "nocontent")
                          : 304 === t
                          ? (S = "notmodified")
                          : ((S = x.state), (f = x.data), (d = !(y = x.error))))
                      : ((y = S),
                        (!t && S) || ((S = "error"), t < 0 && (t = 0))),
                    (C.status = t),
                    (C.statusText = (e || S) + ""),
                    d
                      ? g.resolveWith(h, [f, S, C])
                      : g.rejectWith(h, [C, S, y]),
                    C.statusCode(b),
                    (b = void 0),
                    u &&
                      m.trigger(d ? "ajaxSuccess" : "ajaxError", [
                        C,
                        p,
                        d ? f : y,
                      ]),
                    v.fireWith(h, [C, S]),
                    u &&
                      (m.trigger("ajaxComplete", [C, p]),
                      --T.active || T.event.trigger("ajaxStop")));
                }
                return C;
              },
              getJSON: function (t, e, n) {
                return T.get(t, e, n, "json");
              },
              getScript: function (t, e) {
                return T.get(t, void 0, e, "script");
              },
            }),
            T.each(["get", "post"], function (t, e) {
              T[e] = function (t, n, r, o) {
                return (
                  v(n) && ((o = o || r), (r = n), (n = void 0)),
                  T.ajax(
                    T.extend(
                      { url: t, type: e, dataType: o, data: n, success: r },
                      T.isPlainObject(t) && t
                    )
                  )
                );
              };
            }),
            T.ajaxPrefilter(function (t) {
              var e;
              for (e in t.headers)
                "content-type" === e.toLowerCase() &&
                  (t.contentType = t.headers[e] || "");
            }),
            (T._evalUrl = function (t, e, n) {
              return T.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (t) {
                  T.globalEval(t, e, n);
                },
              });
            }),
            T.fn.extend({
              wrapAll: function (t) {
                var e;
                return (
                  this[0] &&
                    (v(t) && (t = t.call(this[0])),
                    (e = T(t, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && e.insertBefore(this[0]),
                    e
                      .map(function () {
                        for (var t = this; t.firstElementChild; )
                          t = t.firstElementChild;
                        return t;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (t) {
                return v(t)
                  ? this.each(function (e) {
                      T(this).wrapInner(t.call(this, e));
                    })
                  : this.each(function () {
                      var e = T(this),
                        n = e.contents();
                      n.length ? n.wrapAll(t) : e.append(t);
                    });
              },
              wrap: function (t) {
                var e = v(t);
                return this.each(function (n) {
                  T(this).wrapAll(e ? t.call(this, n) : t);
                });
              },
              unwrap: function (t) {
                return (
                  this.parent(t)
                    .not("body")
                    .each(function () {
                      T(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (T.expr.pseudos.hidden = function (t) {
              return !T.expr.pseudos.visible(t);
            }),
            (T.expr.pseudos.visible = function (t) {
              return !!(
                t.offsetWidth ||
                t.offsetHeight ||
                t.getClientRects().length
              );
            }),
            (T.ajaxSettings.xhr = function () {
              try {
                return new r.XMLHttpRequest();
              } catch (t) {}
            });
          var Ze = { 0: 200, 1223: 204 },
            Qe = T.ajaxSettings.xhr();
          (g.cors = !!Qe && "withCredentials" in Qe),
            (g.ajax = Qe = !!Qe),
            T.ajaxTransport(function (t) {
              var e, n;
              if (g.cors || (Qe && !t.crossDomain))
                return {
                  send: function (o, i) {
                    var a,
                      s = t.xhr();
                    if (
                      (s.open(t.type, t.url, t.async, t.username, t.password),
                      t.xhrFields)
                    )
                      for (a in t.xhrFields) s[a] = t.xhrFields[a];
                    for (a in (t.mimeType &&
                      s.overrideMimeType &&
                      s.overrideMimeType(t.mimeType),
                    t.crossDomain ||
                      o["X-Requested-With"] ||
                      (o["X-Requested-With"] = "XMLHttpRequest"),
                    o))
                      s.setRequestHeader(a, o[a]);
                    (e = function (t) {
                      return function () {
                        e &&
                          ((e =
                            n =
                            s.onload =
                            s.onerror =
                            s.onabort =
                            s.ontimeout =
                            s.onreadystatechange =
                              null),
                          "abort" === t
                            ? s.abort()
                            : "error" === t
                            ? "number" != typeof s.status
                              ? i(0, "error")
                              : i(s.status, s.statusText)
                            : i(
                                Ze[s.status] || s.status,
                                s.statusText,
                                "text" !== (s.responseType || "text") ||
                                  "string" != typeof s.responseText
                                  ? { binary: s.response }
                                  : { text: s.responseText },
                                s.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (s.onload = e()),
                      (n = s.onerror = s.ontimeout = e("error")),
                      void 0 !== s.onabort
                        ? (s.onabort = n)
                        : (s.onreadystatechange = function () {
                            4 === s.readyState &&
                              r.setTimeout(function () {
                                e && n();
                              });
                          }),
                      (e = e("abort"));
                    try {
                      s.send((t.hasContent && t.data) || null);
                    } catch (t) {
                      if (e) throw t;
                    }
                  },
                  abort: function () {
                    e && e();
                  },
                };
            }),
            T.ajaxPrefilter(function (t) {
              t.crossDomain && (t.contents.script = !1);
            }),
            T.ajaxSetup({
              accepts: {
                script:
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (t) {
                  return T.globalEval(t), t;
                },
              },
            }),
            T.ajaxPrefilter("script", function (t) {
              void 0 === t.cache && (t.cache = !1),
                t.crossDomain && (t.type = "GET");
            }),
            T.ajaxTransport("script", function (t) {
              var e, n;
              if (t.crossDomain || t.scriptAttrs)
                return {
                  send: function (r, o) {
                    (e = T("<script>")
                      .attr(t.scriptAttrs || {})
                      .prop({ charset: t.scriptCharset, src: t.url })
                      .on(
                        "load error",
                        (n = function (t) {
                          e.remove(),
                            (n = null),
                            t && o("error" === t.type ? 404 : 200, t.type);
                        })
                      )),
                      y.head.appendChild(e[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var tn,
            en = [],
            nn = /(=)\?(?=&|$)|\?\?/;
          T.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var t = en.pop() || T.expando + "_" + ke.guid++;
              return (this[t] = !0), t;
            },
          }),
            T.ajaxPrefilter("json jsonp", function (t, e, n) {
              var o,
                i,
                a,
                s =
                  !1 !== t.jsonp &&
                  (nn.test(t.url)
                    ? "url"
                    : "string" == typeof t.data &&
                      0 ===
                        (t.contentType || "").indexOf(
                          "application/x-www-form-urlencoded"
                        ) &&
                      nn.test(t.data) &&
                      "data");
              if (s || "jsonp" === t.dataTypes[0])
                return (
                  (o = t.jsonpCallback =
                    v(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  s
                    ? (t[s] = t[s].replace(nn, "$1" + o))
                    : !1 !== t.jsonp &&
                      (t.url +=
                        (Ne.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
                  (t.converters["script json"] = function () {
                    return a || T.error(o + " was not called"), a[0];
                  }),
                  (t.dataTypes[0] = "json"),
                  (i = r[o]),
                  (r[o] = function () {
                    a = arguments;
                  }),
                  n.always(function () {
                    void 0 === i ? T(r).removeProp(o) : (r[o] = i),
                      t[o] && ((t.jsonpCallback = e.jsonpCallback), en.push(o)),
                      a && v(i) && i(a[0]),
                      (a = i = void 0);
                  }),
                  "script"
                );
            }),
            (g.createHTMLDocument =
              (((tn = y.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
              2 === tn.childNodes.length)),
            (T.parseHTML = function (t, e, n) {
              return "string" != typeof t
                ? []
                : ("boolean" == typeof e && ((n = e), (e = !1)),
                  e ||
                    (g.createHTMLDocument
                      ? (((r = (e =
                          y.implementation.createHTMLDocument(
                            ""
                          )).createElement("base")).href = y.location.href),
                        e.head.appendChild(r))
                      : (e = y)),
                  (i = !n && []),
                  (o = M.exec(t))
                    ? [e.createElement(o[1])]
                    : ((o = Lt([t], e, i)),
                      i && i.length && T(i).remove(),
                      T.merge([], o.childNodes)));
              var r, o, i;
            }),
            (T.fn.load = function (t, e, n) {
              var r,
                o,
                i,
                a = this,
                s = t.indexOf(" ");
              return (
                s > -1 && ((r = Te(t.slice(s))), (t = t.slice(0, s))),
                v(e)
                  ? ((n = e), (e = void 0))
                  : e && "object" == typeof e && (o = "POST"),
                a.length > 0 &&
                  T.ajax({
                    url: t,
                    type: o || "GET",
                    dataType: "html",
                    data: e,
                  })
                    .done(function (t) {
                      (i = arguments),
                        a.html(
                          r ? T("<div>").append(T.parseHTML(t)).find(r) : t
                        );
                    })
                    .always(
                      n &&
                        function (t, e) {
                          a.each(function () {
                            n.apply(this, i || [t.responseText, e, t]);
                          });
                        }
                    ),
                this
              );
            }),
            (T.expr.pseudos.animated = function (t) {
              return T.grep(T.timers, function (e) {
                return t === e.elem;
              }).length;
            }),
            (T.offset = {
              setOffset: function (t, e, n) {
                var r,
                  o,
                  i,
                  a,
                  s,
                  l,
                  c = T.css(t, "position"),
                  u = T(t),
                  d = {};
                "static" === c && (t.style.position = "relative"),
                  (s = u.offset()),
                  (i = T.css(t, "top")),
                  (l = T.css(t, "left")),
                  ("absolute" === c || "fixed" === c) &&
                  (i + l).indexOf("auto") > -1
                    ? ((a = (r = u.position()).top), (o = r.left))
                    : ((a = parseFloat(i) || 0), (o = parseFloat(l) || 0)),
                  v(e) && (e = e.call(t, n, T.extend({}, s))),
                  null != e.top && (d.top = e.top - s.top + a),
                  null != e.left && (d.left = e.left - s.left + o),
                  "using" in e ? e.using.call(t, d) : u.css(d);
              },
            }),
            T.fn.extend({
              offset: function (t) {
                if (arguments.length)
                  return void 0 === t
                    ? this
                    : this.each(function (e) {
                        T.offset.setOffset(this, t, e);
                      });
                var e,
                  n,
                  r = this[0];
                return r
                  ? r.getClientRects().length
                    ? ((e = r.getBoundingClientRect()),
                      (n = r.ownerDocument.defaultView),
                      {
                        top: e.top + n.pageYOffset,
                        left: e.left + n.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var t,
                    e,
                    n,
                    r = this[0],
                    o = { top: 0, left: 0 };
                  if ("fixed" === T.css(r, "position"))
                    e = r.getBoundingClientRect();
                  else {
                    for (
                      e = this.offset(),
                        n = r.ownerDocument,
                        t = r.offsetParent || n.documentElement;
                      t &&
                      (t === n.body || t === n.documentElement) &&
                      "static" === T.css(t, "position");

                    )
                      t = t.parentNode;
                    t &&
                      t !== r &&
                      1 === t.nodeType &&
                      (((o = T(t).offset()).top += T.css(
                        t,
                        "borderTopWidth",
                        !0
                      )),
                      (o.left += T.css(t, "borderLeftWidth", !0)));
                  }
                  return {
                    top: e.top - o.top - T.css(r, "marginTop", !0),
                    left: e.left - o.left - T.css(r, "marginLeft", !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var t = this.offsetParent;
                    t && "static" === T.css(t, "position");

                  )
                    t = t.offsetParent;
                  return t || mt;
                });
              },
            }),
            T.each(
              { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
              function (t, e) {
                var n = "pageYOffset" === e;
                T.fn[t] = function (r) {
                  return tt(
                    this,
                    function (t, r, o) {
                      var i;
                      if (
                        (b(t)
                          ? (i = t)
                          : 9 === t.nodeType && (i = t.defaultView),
                        void 0 === o)
                      )
                        return i ? i[e] : t[r];
                      i
                        ? i.scrollTo(
                            n ? i.pageXOffset : o,
                            n ? o : i.pageYOffset
                          )
                        : (t[r] = o);
                    },
                    t,
                    r,
                    arguments.length
                  );
                };
              }
            ),
            T.each(["top", "left"], function (t, e) {
              T.cssHooks[e] = te(g.pixelPosition, function (t, n) {
                if (n)
                  return (
                    (n = Qt(t, e)), Jt.test(n) ? T(t).position()[e] + "px" : n
                  );
              });
            }),
            T.each({ Height: "height", Width: "width" }, function (t, e) {
              T.each(
                { padding: "inner" + t, content: e, "": "outer" + t },
                function (n, r) {
                  T.fn[r] = function (o, i) {
                    var a = arguments.length && (n || "boolean" != typeof o),
                      s = n || (!0 === o || !0 === i ? "margin" : "border");
                    return tt(
                      this,
                      function (e, n, o) {
                        var i;
                        return b(e)
                          ? 0 === r.indexOf("outer")
                            ? e["inner" + t]
                            : e.document.documentElement["client" + t]
                          : 9 === e.nodeType
                          ? ((i = e.documentElement),
                            Math.max(
                              e.body["scroll" + t],
                              i["scroll" + t],
                              e.body["offset" + t],
                              i["offset" + t],
                              i["client" + t]
                            ))
                          : void 0 === o
                          ? T.css(e, n, s)
                          : T.style(e, n, o, s);
                      },
                      e,
                      a ? o : void 0,
                      a
                    );
                  };
                }
              );
            }),
            T.each(
              [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
              ],
              function (t, e) {
                T.fn[e] = function (t) {
                  return this.on(e, t);
                };
              }
            ),
            T.fn.extend({
              bind: function (t, e, n) {
                return this.on(t, null, e, n);
              },
              unbind: function (t, e) {
                return this.off(t, null, e);
              },
              delegate: function (t, e, n, r) {
                return this.on(e, t, n, r);
              },
              undelegate: function (t, e, n) {
                return 1 === arguments.length
                  ? this.off(t, "**")
                  : this.off(e, t || "**", n);
              },
              hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t);
              },
            }),
            T.each(
              "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " "
              ),
              function (t, e) {
                T.fn[e] = function (t, n) {
                  return arguments.length > 0
                    ? this.on(e, null, t, n)
                    : this.trigger(e);
                };
              }
            );
          var rn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
          (T.proxy = function (t, e) {
            var n, r, o;
            if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), v(t)))
              return (
                (r = s.call(arguments, 2)),
                (o = function () {
                  return t.apply(e || this, r.concat(s.call(arguments)));
                }),
                (o.guid = t.guid = t.guid || T.guid++),
                o
              );
          }),
            (T.holdReady = function (t) {
              t ? T.readyWait++ : T.ready(!0);
            }),
            (T.isArray = Array.isArray),
            (T.parseJSON = JSON.parse),
            (T.nodeName = I),
            (T.isFunction = v),
            (T.isWindow = b),
            (T.camelCase = ot),
            (T.type = S),
            (T.now = Date.now),
            (T.isNumeric = function (t) {
              var e = T.type(t);
              return (
                ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
              );
            }),
            (T.trim = function (t) {
              return null == t ? "" : (t + "").replace(rn, "$1");
            }),
            void 0 ===
              (n = function () {
                return T;
              }.apply(e, [])) || (t.exports = n);
          var on = r.jQuery,
            an = r.$;
          return (
            (T.noConflict = function (t) {
              return (
                r.$ === T && (r.$ = an),
                t && r.jQuery === T && (r.jQuery = on),
                T
              );
            }),
            void 0 === o && (r.jQuery = r.$ = T),
            T
          );
        });
      },
      8336: function (t, e, n) {
        "use strict";
        n.r(e);
        var r = n(8942),
          o = n(991),
          i = 0,
          a = 0,
          s = o.default.ext.buttons;
        function l(t, e, n) {
          r.fn.animate
            ? t.stop().fadeIn(e, n)
            : (t.css("display", "block"), n && n.call(t));
        }
        function c(t, e, n) {
          r.fn.animate
            ? t.stop().fadeOut(e, n)
            : (t.css("display", "none"), n && n.call(t));
        }
        var u,
          d = function (t, e) {
            if (!(this instanceof d))
              return function (e) {
                return new d(e, t).container();
              };
            void 0 === e && (e = {}),
              !0 === e && (e = {}),
              Array.isArray(e) && (e = { buttons: e }),
              (this.c = r.extend(!0, {}, d.defaults, e)),
              e.buttons && (this.c.buttons = e.buttons),
              (this.s = {
                dt: new o.default.Api(t),
                buttons: [],
                listenKeys: "",
                namespace: "dtb" + i++,
              }),
              (this.dom = {
                container: r("<" + this.c.dom.container.tag + "/>").addClass(
                  this.c.dom.container.className
                ),
              }),
              this._constructor();
          };
        r.extend(d.prototype, {
          action: function (t, e) {
            var n = this._nodeToButton(t);
            return void 0 === e ? n.conf.action : ((n.conf.action = e), this);
          },
          active: function (t, e) {
            var n = this._nodeToButton(t),
              o = this.c.dom.button.active,
              i = r(n.node);
            return void 0 === e
              ? i.hasClass(o)
              : (i.toggleClass(o, void 0 === e || e), this);
          },
          add: function (t, e, n) {
            var r = this.s.buttons;
            if ("string" == typeof e) {
              for (
                var o = e.split("-"), i = this.s, a = 0, s = o.length - 1;
                a < s;
                a++
              )
                i = i.buttons[1 * o[a]];
              (r = i.buttons), (e = 1 * o[o.length - 1]);
            }
            return (
              this._expandButton(
                r,
                t,
                void 0 !== t ? t.split : void 0,
                (void 0 === t || void 0 === t.split || 0 === t.split.length) &&
                  void 0 !== i,
                !1,
                e
              ),
              (void 0 !== n && !0 !== n) || this._draw(),
              this
            );
          },
          collectionRebuild: function (t, e) {
            var n = this._nodeToButton(t);
            if (void 0 !== e) {
              var r;
              for (r = n.buttons.length - 1; r >= 0; r--)
                this.remove(n.buttons[r].node);
              for (
                n.conf.prefixButtons &&
                  e.unshift.apply(e, n.conf.prefixButtons),
                  n.conf.postfixButtons &&
                    e.push.apply(e, n.conf.postfixButtons),
                  r = 0;
                r < e.length;
                r++
              ) {
                var o = e[r];
                this._expandButton(
                  n.buttons,
                  o,
                  void 0 !== o &&
                    void 0 !== o.config &&
                    void 0 !== o.config.split,
                  !0,
                  void 0 !== o.parentConf && void 0 !== o.parentConf.split,
                  null,
                  o.parentConf
                );
              }
            }
            this._draw(n.collection, n.buttons);
          },
          container: function () {
            return this.dom.container;
          },
          disable: function (t) {
            var e = this._nodeToButton(t);
            return (
              r(e.node)
                .addClass(this.c.dom.button.disabled)
                .prop("disabled", !0),
              this
            );
          },
          destroy: function () {
            r("body").off("keyup." + this.s.namespace);
            var t,
              e,
              n = this.s.buttons.slice();
            for (t = 0, e = n.length; t < e; t++) this.remove(n[t].node);
            this.dom.container.remove();
            var o = this.s.dt.settings()[0];
            for (t = 0, e = o.length; t < e; t++)
              if (o.inst === this) {
                o.splice(t, 1);
                break;
              }
            return this;
          },
          enable: function (t, e) {
            if (!1 === e) return this.disable(t);
            var n = this._nodeToButton(t);
            return (
              r(n.node)
                .removeClass(this.c.dom.button.disabled)
                .prop("disabled", !1),
              this
            );
          },
          index: function (t, e, n) {
            e || ((e = ""), (n = this.s.buttons));
            for (var r = 0, o = n.length; r < o; r++) {
              var i = n[r].buttons;
              if (n[r].node === t) return e + r;
              if (i && i.length) {
                var a = this.index(t, r + "-", i);
                if (null !== a) return a;
              }
            }
            return null;
          },
          name: function () {
            return this.c.name;
          },
          node: function (t) {
            if (!t) return this.dom.container;
            var e = this._nodeToButton(t);
            return r(e.node);
          },
          processing: function (t, e) {
            var n = this.s.dt,
              o = this._nodeToButton(t);
            return void 0 === e
              ? r(o.node).hasClass("processing")
              : (r(o.node).toggleClass("processing", e),
                r(n.table().node()).triggerHandler("buttons-processing.dt", [
                  e,
                  n.button(t),
                  n,
                  r(t),
                  o.conf,
                ]),
                this);
          },
          remove: function (t) {
            var e = this._nodeToButton(t),
              n = this._nodeToHost(t),
              o = this.s.dt;
            if (e.buttons.length)
              for (var i = e.buttons.length - 1; i >= 0; i--)
                this.remove(e.buttons[i].node);
            (e.conf.destroying = !0),
              e.conf.destroy &&
                e.conf.destroy.call(o.button(t), o, r(t), e.conf),
              this._removeKey(e.conf),
              r(e.node).remove();
            var a = r.inArray(e, n);
            return n.splice(a, 1), this;
          },
          text: function (t, e) {
            var n = this._nodeToButton(t),
              o = this.c.dom.collection.buttonLiner,
              i =
                n.inCollection && o && o.tag
                  ? o.tag
                  : this.c.dom.buttonLiner.tag,
              a = this.s.dt,
              s = r(n.node),
              l = function (t) {
                return "function" == typeof t ? t(a, s, n.conf) : t;
              };
            return void 0 === e
              ? l(n.conf.text)
              : ((n.conf.text = e),
                i
                  ? s
                      .children(i)
                      .eq(0)
                      .filter(":not(.dt-down-arrow)")
                      .html(l(e))
                  : s.html(l(e)),
                this);
          },
          _constructor: function () {
            var t = this,
              e = this.s.dt,
              n = e.settings()[0],
              o = this.c.buttons;
            n._buttons || (n._buttons = []),
              n._buttons.push({ inst: this, name: this.c.name });
            for (var i = 0, a = o.length; i < a; i++) this.add(o[i]);
            e.on("destroy", function (e, r) {
              r === n && t.destroy();
            }),
              r("body").on("keyup." + this.s.namespace, function (e) {
                if (
                  !document.activeElement ||
                  document.activeElement === document.body
                ) {
                  var n = String.fromCharCode(e.keyCode).toLowerCase();
                  -1 !== t.s.listenKeys.toLowerCase().indexOf(n) &&
                    t._keypress(n, e);
                }
              });
          },
          _addKey: function (t) {
            t.key &&
              (this.s.listenKeys += r.isPlainObject(t.key) ? t.key.key : t.key);
          },
          _draw: function (t, e) {
            t || ((t = this.dom.container), (e = this.s.buttons)),
              t.children().detach();
            for (var n = 0, r = e.length; n < r; n++)
              t.append(e[n].inserter),
                t.append(" "),
                e[n].buttons &&
                  e[n].buttons.length &&
                  this._draw(e[n].collection, e[n].buttons);
          },
          _expandButton: function (t, e, n, o, i, a, s) {
            var l = this.s.dt,
              c = !1,
              u = Array.isArray(e) ? e : [e];
            void 0 === e && (u = Array.isArray(n) ? n : [n]),
              void 0 !== e && void 0 !== e.split && (c = !0);
            for (var d = 0, f = u.length; d < f; d++) {
              var p = this._resolveExtends(u[d]);
              if (p)
                if (
                  ((c = !(void 0 === p.config || !p.config.split)),
                  Array.isArray(p))
                )
                  this._expandButton(
                    t,
                    p,
                    void 0 !== h && void 0 !== h.conf ? h.conf.split : void 0,
                    o,
                    void 0 !== s && void 0 !== s.split,
                    a,
                    s
                  );
                else {
                  var h = this._buildButton(
                    p,
                    o,
                    void 0 !== p.split ||
                      (void 0 !== p.config && void 0 !== p.config.split),
                    i
                  );
                  if (h) {
                    if (
                      (null != a ? (t.splice(a, 0, h), a++) : t.push(h),
                      h.conf.buttons || h.conf.split)
                    ) {
                      if (
                        ((h.collection = r(
                          "<" +
                            (c
                              ? this.c.dom.splitCollection.tag
                              : this.c.dom.collection.tag) +
                            "/>"
                        )),
                        (h.conf._collection = h.collection),
                        h.conf.split)
                      )
                        for (var m = 0; m < h.conf.split.length; m++)
                          "object" == typeof h.conf.split[m] &&
                            ((h.conf.split[m].parent = s),
                            void 0 === h.conf.split[m].collectionLayout &&
                              (h.conf.split[m].collectionLayout =
                                h.conf.collectionLayout),
                            void 0 === h.conf.split[m].dropup &&
                              (h.conf.split[m].dropup = h.conf.dropup),
                            void 0 === h.conf.split[m].fade &&
                              (h.conf.split[m].fade = h.conf.fade));
                      else
                        r(h.node).append(
                          r(
                            '<span class="dt-down-arrow">' +
                              this.c.dom.splitDropdown.text +
                              "</span>"
                          )
                        );
                      this._expandButton(
                        h.buttons,
                        h.conf.buttons,
                        h.conf.split,
                        !c,
                        c,
                        a,
                        h.conf
                      );
                    }
                    (h.conf.parent = s),
                      p.init && p.init.call(l.button(h.node), l, r(h.node), p);
                  }
                }
            }
          },
          _buildButton: function (t, e, n, o) {
            var i,
              l = this.c.dom.button,
              c = this.c.dom.buttonLiner,
              u = this.c.dom.collection,
              d = (this.c.dom.split, this.c.dom.splitCollection),
              f = this.c.dom.splitDropdownButton,
              p = this.s.dt,
              h = function (e) {
                return "function" == typeof e ? e(p, i, t) : e;
              };
            if (t.spacer) {
              var m = r("<span></span>")
                .addClass("dt-button-spacer " + t.style + " " + l.spacerClass)
                .html(h(t.text));
              return {
                conf: t,
                node: m,
                inserter: m,
                buttons: [],
                inCollection: e,
                isSplit: n,
                inSplit: o,
                collection: null,
              };
            }
            if (
              (!n && o && d ? (l = f) : !n && e && u.button && (l = u.button),
              !n && o && d.buttonLiner
                ? (c = d.buttonLiner)
                : !n && e && u.buttonLiner && (c = u.buttonLiner),
              t.available && !t.available(p, t) && !t.hasOwnProperty("html"))
            )
              return !1;
            if (t.hasOwnProperty("html")) i = r(t.html);
            else {
              var g = function (t, e, n, o) {
                  o.action.call(e.button(n), t, e, n, o),
                    r(e.table().node()).triggerHandler("buttons-action.dt", [
                      e.button(n),
                      e,
                      n,
                      o,
                    ]);
                },
                v = t.tag || l.tag,
                b = void 0 === t.clickBlurs || t.clickBlurs;
              if (
                ((i = r("<" + v + "/>")
                  .addClass(l.className)
                  .addClass(o ? this.c.dom.splitDropdownButton.className : "")
                  .attr("tabindex", this.s.dt.settings()[0].iTabIndex)
                  .attr("aria-controls", this.s.dt.table().node().id)
                  .on("click.dtb", function (e) {
                    e.preventDefault(),
                      !i.hasClass(l.disabled) && t.action && g(e, p, i, t),
                      b && i.trigger("blur");
                  })
                  .on("keypress.dtb", function (e) {
                    13 === e.keyCode &&
                      (e.preventDefault(),
                      !i.hasClass(l.disabled) && t.action && g(e, p, i, t));
                  })),
                "a" === v.toLowerCase() && i.attr("href", "#"),
                "button" === v.toLowerCase() && i.attr("type", "button"),
                c.tag)
              ) {
                var y = r("<" + c.tag + "/>")
                  .html(h(t.text))
                  .addClass(c.className);
                "a" === c.tag.toLowerCase() && y.attr("href", "#"), i.append(y);
              } else i.html(h(t.text));
              !1 === t.enabled && i.addClass(l.disabled),
                t.className && i.addClass(t.className),
                t.titleAttr && i.attr("title", h(t.titleAttr)),
                t.attr && i.attr(t.attr),
                t.namespace || (t.namespace = ".dt-button-" + a++),
                void 0 !== t.config &&
                  t.config.split &&
                  (t.split = t.config.split);
            }
            var x,
              w,
              S = this.c.dom.buttonContainer;
            if (
              ((x =
                S && S.tag
                  ? r("<" + S.tag + "/>")
                      .addClass(S.className)
                      .append(i)
                  : i),
              this._addKey(t),
              this.c.buttonCreated && (x = this.c.buttonCreated(t, x)),
              n)
            ) {
              (w = r("<div/>").addClass(
                this.c.dom.splitWrapper.className
              )).append(i);
              var C = r.extend(t, {
                text: this.c.dom.splitDropdown.text,
                className: this.c.dom.splitDropdown.className,
                closeButton: !1,
                attr: { "aria-haspopup": "dialog", "aria-expanded": !1 },
                align: this.c.dom.splitDropdown.align,
                splitAlignClass: this.c.dom.splitDropdown.splitAlignClass,
              });
              this._addKey(C);
              var _ = function (t, e, n, o) {
                  s.split.action.call(e.button(w), t, e, n, o),
                    r(e.table().node()).triggerHandler("buttons-action.dt", [
                      e.button(n),
                      e,
                      n,
                      o,
                    ]),
                    n.attr("aria-expanded", !0);
                },
                T = r(
                  '<button class="' +
                    this.c.dom.splitDropdown.className +
                    ' dt-button"><span class="dt-btn-split-drop-arrow">' +
                    this.c.dom.splitDropdown.text +
                    "</span></button>"
                )
                  .on("click.dtb", function (t) {
                    t.preventDefault(),
                      t.stopPropagation(),
                      T.hasClass(l.disabled) || _(t, p, T, C),
                      b && T.trigger("blur");
                  })
                  .on("keypress.dtb", function (t) {
                    13 === t.keyCode &&
                      (t.preventDefault(),
                      T.hasClass(l.disabled) || _(t, p, T, C));
                  });
              0 === t.split.length && T.addClass("dtb-hide-drop"),
                w.append(T).attr(C.attr);
            }
            return {
              conf: t,
              node: n ? w.get(0) : i.get(0),
              inserter: n ? w : x,
              buttons: [],
              inCollection: e,
              isSplit: n,
              inSplit: o,
              collection: null,
            };
          },
          _nodeToButton: function (t, e) {
            e || (e = this.s.buttons);
            for (var n = 0, r = e.length; n < r; n++) {
              if (e[n].node === t) return e[n];
              if (e[n].buttons.length) {
                var o = this._nodeToButton(t, e[n].buttons);
                if (o) return o;
              }
            }
          },
          _nodeToHost: function (t, e) {
            e || (e = this.s.buttons);
            for (var n = 0, r = e.length; n < r; n++) {
              if (e[n].node === t) return e;
              if (e[n].buttons.length) {
                var o = this._nodeToHost(t, e[n].buttons);
                if (o) return o;
              }
            }
          },
          _keypress: function (t, e) {
            if (!e._buttonsHandled) {
              var n = function (n, o) {
                  if (n.key)
                    if (n.key === t) (e._buttonsHandled = !0), r(o).click();
                    else if (r.isPlainObject(n.key)) {
                      if (n.key.key !== t) return;
                      if (n.key.shiftKey && !e.shiftKey) return;
                      if (n.key.altKey && !e.altKey) return;
                      if (n.key.ctrlKey && !e.ctrlKey) return;
                      if (n.key.metaKey && !e.metaKey) return;
                      (e._buttonsHandled = !0), r(o).click();
                    }
                },
                o = function (t) {
                  for (var e = 0, r = t.length; e < r; e++)
                    n(t[e].conf, t[e].node),
                      t[e].buttons.length && o(t[e].buttons);
                };
              o(this.s.buttons);
            }
          },
          _removeKey: function (t) {
            if (t.key) {
              var e = r.isPlainObject(t.key) ? t.key.key : t.key,
                n = this.s.listenKeys.split(""),
                o = r.inArray(e, n);
              n.splice(o, 1), (this.s.listenKeys = n.join(""));
            }
          },
          _resolveExtends: function (t) {
            var e,
              n,
              o = this,
              i = this.s.dt,
              a = function (e) {
                for (var n = 0; !r.isPlainObject(e) && !Array.isArray(e); ) {
                  if (void 0 === e) return;
                  if ("function" == typeof e) {
                    if (!(e = e.call(o, i, t))) return !1;
                  } else if ("string" == typeof e) {
                    if (!s[e]) return { html: e };
                    e = s[e];
                  }
                  if (++n > 30) throw "Buttons: Too many iterations";
                }
                return Array.isArray(e) ? e : r.extend({}, e);
              };
            for (t = a(t); t && t.extend; ) {
              if (!s[t.extend])
                throw "Cannot extend unknown button type: " + t.extend;
              var l = a(s[t.extend]);
              if (Array.isArray(l)) return l;
              if (!l) return !1;
              var c = l.className;
              void 0 !== t.config &&
                void 0 !== l.config &&
                (t.config = r.extend({}, l.config, t.config)),
                (t = r.extend({}, l, t)),
                c && t.className !== c && (t.className = c + " " + t.className),
                (t.extend = l.extend);
            }
            var u = t.postfixButtons;
            if (u)
              for (
                t.buttons || (t.buttons = []), e = 0, n = u.length;
                e < n;
                e++
              )
                t.buttons.push(u[e]);
            var d = t.prefixButtons;
            if (d)
              for (
                t.buttons || (t.buttons = []), e = 0, n = d.length;
                e < n;
                e++
              )
                t.buttons.splice(e, 0, d[e]);
            return t;
          },
          _popover: function (t, e, n, o) {
            var i = e,
              a = this.c,
              s = !1,
              u = r.extend(
                {
                  align: "button-left",
                  autoClose: !1,
                  background: !0,
                  backgroundClassName: "dt-button-background",
                  closeButton: !0,
                  contentClassName: a.dom.collection.className,
                  collectionLayout: "",
                  collectionTitle: "",
                  dropup: !1,
                  fade: 400,
                  popoverTitle: "",
                  rightAlignClassName: "dt-button-right",
                  tag: a.dom.collection.tag,
                },
                n
              ),
              f = e.node(),
              p = function () {
                (s = !0),
                  c(r(".dt-button-collection"), u.fade, function () {
                    r(this).detach();
                  }),
                  r(
                    i
                      .buttons('[aria-haspopup="dialog"][aria-expanded="true"]')
                      .nodes()
                  ).attr("aria-expanded", "false"),
                  r("div.dt-button-background").off("click.dtb-collection"),
                  d.background(!1, u.backgroundClassName, u.fade, f),
                  r(window).off("resize.resize.dtb-collection"),
                  r("body").off(".dtb-collection"),
                  i.off("buttons-action.b-internal"),
                  i.off("destroy");
              };
            if (!1 !== t) {
              var h = r(
                i
                  .buttons('[aria-haspopup="dialog"][aria-expanded="true"]')
                  .nodes()
              );
              h.length &&
                (f.closest("div.dt-button-collection").length && (f = h.eq(0)),
                p());
              var m = r(".dt-button", t).length,
                g = "";
              3 === m
                ? (g = "dtb-b3")
                : 2 === m
                ? (g = "dtb-b2")
                : 1 === m && (g = "dtb-b1");
              var v = r("<div/>")
                .addClass("dt-button-collection")
                .addClass(u.collectionLayout)
                .addClass(u.splitAlignClass)
                .addClass(g)
                .css("display", "none")
                .attr({ "aria-modal": !0, role: "dialog" });
              (t = r(t)
                .addClass(u.contentClassName)
                .attr("role", "menu")
                .appendTo(v)),
                f.attr("aria-expanded", "true"),
                f.parents("body")[0] !== document.body &&
                  (f = document.body.lastChild),
                u.popoverTitle
                  ? v.prepend(
                      '<div class="dt-button-collection-title">' +
                        u.popoverTitle +
                        "</div>"
                    )
                  : u.collectionTitle &&
                    v.prepend(
                      '<div class="dt-button-collection-title">' +
                        u.collectionTitle +
                        "</div>"
                    ),
                u.closeButton &&
                  v
                    .prepend('<div class="dtb-popover-close">x</div>')
                    .addClass("dtb-collection-closeable"),
                l(v.insertAfter(f), u.fade);
              var b = r(e.table().container()),
                y = v.css("position");
              if (
                (("container" !== u.span && "dt-container" !== u.align) ||
                  ((f = f.parent()), v.css("width", b.width())),
                "absolute" === y)
              ) {
                var x = r(f[0].offsetParent),
                  w = f.position(),
                  S = f.offset(),
                  C = x.offset(),
                  _ = x.position(),
                  T = window.getComputedStyle(x[0]);
                (C.height = x.outerHeight()),
                  (C.width = x.width() + parseFloat(T.paddingLeft)),
                  (C.right = C.left + C.width),
                  (C.bottom = C.top + C.height);
                var D = w.top + f.outerHeight(),
                  I = w.left;
                v.css({ top: D, left: I }), (T = window.getComputedStyle(v[0]));
                var A = v.offset();
                (A.height = v.outerHeight()),
                  (A.width = v.outerWidth()),
                  (A.right = A.left + A.width),
                  (A.bottom = A.top + A.height),
                  (A.marginTop = parseFloat(T.marginTop)),
                  (A.marginBottom = parseFloat(T.marginBottom)),
                  u.dropup &&
                    (D = w.top - A.height - A.marginTop - A.marginBottom),
                  ("button-right" === u.align ||
                    v.hasClass(u.rightAlignClassName)) &&
                    (I = w.left - A.width + f.outerWidth()),
                  ("dt-container" !== u.align && "container" !== u.align) ||
                    (I < w.left && (I = -w.left),
                    I + A.width > C.width && (I = C.width - A.width)),
                  _.left + I + A.width > r(window).width() &&
                    (I = r(window).width() - A.width - _.left),
                  S.left + I < 0 && (I = -S.left),
                  _.top + D + A.height >
                    r(window).height() + r(window).scrollTop() &&
                    (D = w.top - A.height - A.marginTop - A.marginBottom),
                  _.top + D < r(window).scrollTop() &&
                    (D = w.top + f.outerHeight()),
                  v.css({ top: D, left: I });
              } else {
                y = function () {
                  var t = r(window).height() / 2,
                    e = v.height() / 2;
                  e > t && (e = t), v.css("marginTop", -1 * e);
                };
                y(),
                  r(window).on("resize.dtb-collection", function () {
                    y();
                  });
              }
              u.background &&
                d.background(
                  !0,
                  u.backgroundClassName,
                  u.fade,
                  u.backgroundHost || f
                ),
                r("div.dt-button-background").on(
                  "click.dtb-collection",
                  function () {}
                ),
                u.autoClose &&
                  setTimeout(function () {
                    i.on("buttons-action.b-internal", function (t, e, n, r) {
                      r[0] !== f[0] && p();
                    });
                  }, 0),
                r(v).trigger("buttons-popover.dt"),
                i.on("destroy", p),
                setTimeout(function () {
                  (s = !1),
                    r("body")
                      .on("click.dtb-collection", function (e) {
                        if (!s) {
                          var n = r.fn.addBack ? "addBack" : "andSelf",
                            o = r(e.target).parent()[0];
                          ((!r(e.target).parents()[n]().filter(t).length &&
                            !r(o).hasClass("dt-buttons")) ||
                            r(e.target).hasClass("dt-button-background")) &&
                            p();
                        }
                      })
                      .on("keyup.dtb-collection", function (t) {
                        27 === t.keyCode && p();
                      })
                      .on("keydown.dtb-collection", function (e) {
                        var n = r("a, button", t),
                          o = document.activeElement;
                        9 === e.keyCode &&
                          (-1 === n.index(o)
                            ? (n.first().focus(), e.preventDefault())
                            : e.shiftKey
                            ? o === n[0] &&
                              (n.last().focus(), e.preventDefault())
                            : o === n.last()[0] &&
                              (n.first().focus(), e.preventDefault()));
                      });
                }, 0);
            } else p();
          },
        }),
          (d.background = function (t, e, n, o) {
            void 0 === n && (n = 400),
              o || (o = document.body),
              t
                ? l(
                    r("<div/>")
                      .addClass(e)
                      .css("display", "none")
                      .insertAfter(o),
                    n
                  )
                : c(r("div." + e), n, function () {
                    r(this).removeClass(e).remove();
                  });
          }),
          (d.instanceSelector = function (t, e) {
            if (null == t)
              return r.map(e, function (t) {
                return t.inst;
              });
            var n = [],
              o = r.map(e, function (t) {
                return t.name;
              }),
              i = function (t) {
                if (Array.isArray(t))
                  for (var a = 0, s = t.length; a < s; a++) i(t[a]);
                else if ("string" == typeof t)
                  if (-1 !== t.indexOf(",")) i(t.split(","));
                  else {
                    var l = r.inArray(t.trim(), o);
                    -1 !== l && n.push(e[l].inst);
                  }
                else
                  "number" == typeof t
                    ? n.push(e[t].inst)
                    : "object" == typeof t && n.push(t);
              };
            return i(t), n;
          }),
          (d.buttonSelector = function (t, e) {
            for (
              var n = [],
                o = function (t, e, n) {
                  for (var r, i, a = 0, s = e.length; a < s; a++)
                    (r = e[a]) &&
                      ((i = void 0 !== n ? n + a : a + ""),
                      t.push({ node: r.node, name: r.conf.name, idx: i }),
                      r.buttons && o(t, r.buttons, i + "-"));
                },
                i = function (t, e) {
                  var a,
                    s,
                    l = [];
                  o(l, e.s.buttons);
                  var c = r.map(l, function (t) {
                    return t.node;
                  });
                  if (Array.isArray(t) || t instanceof r)
                    for (a = 0, s = t.length; a < s; a++) i(t[a], e);
                  else if (null == t || "*" === t)
                    for (a = 0, s = l.length; a < s; a++)
                      n.push({ inst: e, node: l[a].node });
                  else if ("number" == typeof t)
                    e.s.buttons[t] &&
                      n.push({ inst: e, node: e.s.buttons[t].node });
                  else if ("string" == typeof t)
                    if (-1 !== t.indexOf(",")) {
                      var u = t.split(",");
                      for (a = 0, s = u.length; a < s; a++) i(u[a].trim(), e);
                    } else if (t.match(/^\d+(\-\d+)*$/)) {
                      var d = r.map(l, function (t) {
                        return t.idx;
                      });
                      n.push({ inst: e, node: l[r.inArray(t, d)].node });
                    } else if (-1 !== t.indexOf(":name")) {
                      var f = t.replace(":name", "");
                      for (a = 0, s = l.length; a < s; a++)
                        l[a].name === f && n.push({ inst: e, node: l[a].node });
                    } else
                      r(c)
                        .filter(t)
                        .each(function () {
                          n.push({ inst: e, node: this });
                        });
                  else if ("object" == typeof t && t.nodeName) {
                    var p = r.inArray(t, c);
                    -1 !== p && n.push({ inst: e, node: c[p] });
                  }
                },
                a = 0,
                s = t.length;
              a < s;
              a++
            ) {
              var l = t[a];
              i(e, l);
            }
            return n;
          }),
          (d.stripData = function (t, e) {
            return (
              "string" != typeof t ||
                ((t = (t = t.replace(
                  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                  ""
                )).replace(/<!\-\-.*?\-\->/g, "")),
                (e && !e.stripHtml) || (t = t.replace(/<[^>]*>/g, "")),
                (e && !e.trim) || (t = t.replace(/^\s+|\s+$/g, "")),
                (e && !e.stripNewlines) || (t = t.replace(/\n/g, " ")),
                (e && !e.decodeEntities) || ((g.innerHTML = t), (t = g.value))),
              t
            );
          }),
          (d.defaults = {
            buttons: ["copy", "excel", "csv", "pdf", "print"],
            name: "main",
            tabIndex: 0,
            dom: {
              container: { tag: "div", className: "dt-buttons" },
              collection: { tag: "div", className: "" },
              button: {
                tag: "button",
                className: "dt-button",
                active: "active",
                disabled: "disabled",
                spacerClass: "",
              },
              buttonLiner: { tag: "span", className: "" },
              split: { tag: "div", className: "dt-button-split" },
              splitWrapper: { tag: "div", className: "dt-btn-split-wrapper" },
              splitDropdown: {
                tag: "button",
                text: "&#x25BC;",
                className: "dt-btn-split-drop",
                align: "split-right",
                splitAlignClass: "dt-button-split-left",
              },
              splitDropdownButton: {
                tag: "button",
                className: "dt-btn-split-drop-button dt-button",
              },
              splitCollection: {
                tag: "div",
                className: "dt-button-split-collection",
              },
            },
          }),
          (d.version = "2.3.6"),
          r.extend(s, {
            collection: {
              text: function (t) {
                return t.i18n("buttons.collection", "Collection");
              },
              className: "buttons-collection",
              closeButton: !1,
              init: function (t, e, n) {
                e.attr("aria-expanded", !1);
              },
              action: function (t, e, n, o) {
                o._collection.parents("body").length
                  ? this.popover(!1, o)
                  : this.popover(o._collection, o),
                  "keypress" === t.type &&
                    r("a, button", o._collection).eq(0).focus();
              },
              attr: { "aria-haspopup": "dialog" },
            },
            split: {
              text: function (t) {
                return t.i18n("buttons.split", "Split");
              },
              className: "buttons-split",
              closeButton: !1,
              init: function (t, e, n) {
                return e.attr("aria-expanded", !1);
              },
              action: function (t, e, n, r) {
                this.popover(r._collection, r);
              },
              attr: { "aria-haspopup": "dialog" },
            },
            copy: function (t, e) {
              if (s.copyHtml5) return "copyHtml5";
            },
            csv: function (t, e) {
              if (s.csvHtml5 && s.csvHtml5.available(t, e)) return "csvHtml5";
            },
            excel: function (t, e) {
              if (s.excelHtml5 && s.excelHtml5.available(t, e))
                return "excelHtml5";
            },
            pdf: function (t, e) {
              if (s.pdfHtml5 && s.pdfHtml5.available(t, e)) return "pdfHtml5";
            },
            pageLength: function (t) {
              var e = t.settings()[0].aLengthMenu,
                n = [],
                o = [];
              if (Array.isArray(e[0])) (n = e[0]), (o = e[1]);
              else
                for (var i = 0; i < e.length; i++) {
                  var a = e[i];
                  r.isPlainObject(a)
                    ? (n.push(a.value), o.push(a.label))
                    : (n.push(a), o.push(a));
                }
              return {
                extend: "collection",
                text: function (t) {
                  return t.i18n(
                    "buttons.pageLength",
                    { "-1": "Show all rows", _: "Show %d rows" },
                    t.page.len()
                  );
                },
                className: "buttons-page-length",
                autoClose: !0,
                buttons: r.map(n, function (t, e) {
                  return {
                    text: o[e],
                    className: "button-page-length",
                    action: function (e, n) {
                      n.page.len(t).draw();
                    },
                    init: function (e, n, r) {
                      var o = this,
                        i = function () {
                          o.active(e.page.len() === t);
                        };
                      e.on("length.dt" + r.namespace, i), i();
                    },
                    destroy: function (t, e, n) {
                      t.off("length.dt" + n.namespace);
                    },
                  };
                }),
                init: function (t, e, n) {
                  var r = this;
                  t.on("length.dt" + n.namespace, function () {
                    r.text(n.text);
                  });
                },
                destroy: function (t, e, n) {
                  t.off("length.dt" + n.namespace);
                },
              };
            },
            spacer: {
              style: "empty",
              spacer: !0,
              text: function (t) {
                return t.i18n("buttons.spacer", "");
              },
            },
          }),
          o.default.Api.register("buttons()", function (t, e) {
            void 0 === e && ((e = t), (t = void 0)),
              (this.selector.buttonGroup = t);
            var n = this.iterator(
              !0,
              "table",
              function (n) {
                if (n._buttons)
                  return d.buttonSelector(d.instanceSelector(t, n._buttons), e);
              },
              !0
            );
            return (n._groupSelector = t), n;
          }),
          o.default.Api.register("button()", function (t, e) {
            var n = this.buttons(t, e);
            return n.length > 1 && n.splice(1, n.length), n;
          }),
          o.default.Api.registerPlural(
            "buttons().active()",
            "button().active()",
            function (t) {
              return void 0 === t
                ? this.map(function (t) {
                    return t.inst.active(t.node);
                  })
                : this.each(function (e) {
                    e.inst.active(e.node, t);
                  });
            }
          ),
          o.default.Api.registerPlural(
            "buttons().action()",
            "button().action()",
            function (t) {
              return void 0 === t
                ? this.map(function (t) {
                    return t.inst.action(t.node);
                  })
                : this.each(function (e) {
                    e.inst.action(e.node, t);
                  });
            }
          ),
          o.default.Api.registerPlural(
            "buttons().collectionRebuild()",
            "button().collectionRebuild()",
            function (t) {
              return this.each(function (e) {
                for (var n = 0; n < t.length; n++)
                  "object" == typeof t[n] && (t[n].parentConf = e);
                e.inst.collectionRebuild(e.node, t);
              });
            }
          ),
          o.default.Api.register(
            ["buttons().enable()", "button().enable()"],
            function (t) {
              return this.each(function (e) {
                e.inst.enable(e.node, t);
              });
            }
          ),
          o.default.Api.register(
            ["buttons().disable()", "button().disable()"],
            function () {
              return this.each(function (t) {
                t.inst.disable(t.node);
              });
            }
          ),
          o.default.Api.register("button().index()", function () {
            var t = null;
            return (
              this.each(function (e) {
                var n = e.inst.index(e.node);
                null !== n && (t = n);
              }),
              t
            );
          }),
          o.default.Api.registerPlural(
            "buttons().nodes()",
            "button().node()",
            function () {
              var t = r();
              return (
                r(
                  this.each(function (e) {
                    t = t.add(e.inst.node(e.node));
                  })
                ),
                t
              );
            }
          ),
          o.default.Api.registerPlural(
            "buttons().processing()",
            "button().processing()",
            function (t) {
              return void 0 === t
                ? this.map(function (t) {
                    return t.inst.processing(t.node);
                  })
                : this.each(function (e) {
                    e.inst.processing(e.node, t);
                  });
            }
          ),
          o.default.Api.registerPlural(
            "buttons().text()",
            "button().text()",
            function (t) {
              return void 0 === t
                ? this.map(function (t) {
                    return t.inst.text(t.node);
                  })
                : this.each(function (e) {
                    e.inst.text(e.node, t);
                  });
            }
          ),
          o.default.Api.registerPlural(
            "buttons().trigger()",
            "button().trigger()",
            function () {
              return this.each(function (t) {
                t.inst.node(t.node).trigger("click");
              });
            }
          ),
          o.default.Api.register("button().popover()", function (t, e) {
            return this.map(function (n) {
              return n.inst._popover(t, this.button(this[0].node), e);
            });
          }),
          o.default.Api.register("buttons().containers()", function () {
            var t = r(),
              e = this._groupSelector;
            return (
              this.iterator(!0, "table", function (n) {
                if (n._buttons)
                  for (
                    var r = d.instanceSelector(e, n._buttons),
                      o = 0,
                      i = r.length;
                    o < i;
                    o++
                  )
                    t = t.add(r[o].container());
              }),
              t
            );
          }),
          o.default.Api.register("buttons().container()", function () {
            return this.containers().eq(0);
          }),
          o.default.Api.register("button().add()", function (t, e, n) {
            var r = this.context;
            if (r.length) {
              var o = d.instanceSelector(this._groupSelector, r[0]._buttons);
              o.length && o[0].add(e, t, n);
            }
            return this.button(this._groupSelector, t);
          }),
          o.default.Api.register("buttons().destroy()", function () {
            return (
              this.pluck("inst")
                .unique()
                .each(function (t) {
                  t.destroy();
                }),
              this
            );
          }),
          o.default.Api.registerPlural(
            "buttons().remove()",
            "buttons().remove()",
            function () {
              return (
                this.each(function (t) {
                  t.inst.remove(t.node);
                }),
                this
              );
            }
          ),
          o.default.Api.register("buttons.info()", function (t, e, n) {
            var o = this;
            return !1 === t
              ? (this.off("destroy.btn-info"),
                c(r("#datatables_buttons_info"), 400, function () {
                  r(this).remove();
                }),
                clearTimeout(u),
                (u = null),
                this)
              : (u && clearTimeout(u),
                r("#datatables_buttons_info").length &&
                  r("#datatables_buttons_info").remove(),
                (t = t ? "<h2>" + t + "</h2>" : ""),
                l(
                  r(
                    '<div id="datatables_buttons_info" class="dt-button-info"/>'
                  )
                    .html(t)
                    .append(
                      r("<div/>")["string" == typeof e ? "html" : "append"](e)
                    )
                    .css("display", "none")
                    .appendTo("body")
                ),
                void 0 !== n &&
                  0 !== n &&
                  (u = setTimeout(function () {
                    o.buttons.info(!1);
                  }, n)),
                this.on("destroy.btn-info", function () {
                  o.buttons.info(!1);
                }),
                this);
          }),
          o.default.Api.register("buttons.exportData()", function (t) {
            if (this.context.length)
              return v(new o.default.Api(this.context[0]), t);
          }),
          o.default.Api.register("buttons.exportInfo()", function (t) {
            return (
              t || (t = {}),
              {
                filename: f(t),
                title: h(t),
                messageTop: m(this, t.message || t.messageTop, "top"),
                messageBottom: m(this, t.messageBottom, "bottom"),
              }
            );
          });
        var f = function (t) {
            var e =
              "*" === t.filename &&
              "*" !== t.title &&
              void 0 !== t.title &&
              null !== t.title &&
              "" !== t.title
                ? t.title
                : t.filename;
            if (("function" == typeof e && (e = e()), null == e)) return null;
            -1 !== e.indexOf("*") &&
              (e = e.replace("*", r("head > title").text()).trim()),
              (e = e.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, ""));
            var n = p(t.extension);
            return n || (n = ""), e + n;
          },
          p = function (t) {
            return null == t ? null : "function" == typeof t ? t() : t;
          },
          h = function (t) {
            var e = p(t.title);
            return null === e
              ? null
              : -1 !== e.indexOf("*")
              ? e.replace("*", r("head > title").text() || "Exported data")
              : e;
          },
          m = function (t, e, n) {
            var o = p(e);
            if (null === o) return null;
            var i = r("caption", t.table().container()).eq(0);
            return "*" === o
              ? i.css("caption-side") !== n
                ? null
                : i.length
                ? i.text()
                : ""
              : o;
          },
          g = r("<textarea/>")[0],
          v = function (t, e) {
            var n = r.extend(
                !0,
                {},
                {
                  rows: null,
                  columns: "",
                  modifier: { search: "applied", order: "applied" },
                  orthogonal: "display",
                  stripHtml: !0,
                  stripNewlines: !0,
                  decodeEntities: !0,
                  trim: !0,
                  format: {
                    header: function (t) {
                      return d.stripData(t, n);
                    },
                    footer: function (t) {
                      return d.stripData(t, n);
                    },
                    body: function (t) {
                      return d.stripData(t, n);
                    },
                  },
                  customizeData: null,
                },
                e
              ),
              o = t
                .columns(n.columns)
                .indexes()
                .map(function (e) {
                  var r = t.column(e).header();
                  return n.format.header(r.innerHTML, e, r);
                })
                .toArray(),
              i = t.table().footer()
                ? t
                    .columns(n.columns)
                    .indexes()
                    .map(function (e) {
                      var r = t.column(e).footer();
                      return n.format.footer(r ? r.innerHTML : "", e, r);
                    })
                    .toArray()
                : null,
              a = r.extend({}, n.modifier);
            t.select &&
              "function" == typeof t.select.info &&
              void 0 === a.selected &&
              t.rows(n.rows, r.extend({ selected: !0 }, a)).any() &&
              r.extend(a, { selected: !0 });
            for (
              var s = t.rows(n.rows, a).indexes().toArray(),
                l = t.cells(s, n.columns),
                c = l.render(n.orthogonal).toArray(),
                u = l.nodes().toArray(),
                f = o.length,
                p = [],
                h = 0,
                m = 0,
                g = f > 0 ? c.length / f : 0;
              m < g;
              m++
            ) {
              for (var v = [f], b = 0; b < f; b++)
                (v[b] = n.format.body(c[h], m, b, u[h])), h++;
              p[m] = v;
            }
            var y = { header: o, footer: i, body: p };
            return n.customizeData && n.customizeData(y), y;
          };
        function b(t, e) {
          var n = new o.default.Api(t),
            r = e || n.init().buttons || o.default.defaults.buttons;
          return new d(n, r).container();
        }
        (r.fn.dataTable.Buttons = d),
          (r.fn.DataTable.Buttons = d),
          r(document).on("init.dt plugin-init.dt", function (t, e) {
            if ("dt" === t.namespace) {
              var n = e.oInit.buttons || o.default.defaults.buttons;
              n && !e._buttons && new d(e, n).container();
            }
          }),
          o.default.ext.feature.push({ fnInit: b, cFeature: "B" }),
          o.default.ext.features &&
            o.default.ext.features.register("buttons", b),
          (e.default = o.default);
      },
      991: function (t, e, n) {
        "use strict";
        n.r(e);
        let r = n(8942);
        var o,
          i,
          a,
          s,
          l = function (t, e) {
            if (l.factory(t, e)) return l;
            if (this instanceof l) return r(t).DataTable(e);
            (e = t),
              (this.$ = function (t, e) {
                return this.api(!0).$(t, e);
              }),
              (this._ = function (t, e) {
                return this.api(!0).rows(t, e).data();
              }),
              (this.api = function (t) {
                return new i(t ? le(this[o.iApiIndex]) : this);
              }),
              (this.fnAddData = function (t, e) {
                var n = this.api(!0),
                  o =
                    Array.isArray(t) &&
                    (Array.isArray(t[0]) || r.isPlainObject(t[0]))
                      ? n.rows.add(t)
                      : n.row.add(t);
                return (void 0 === e || e) && n.draw(), o.flatten().toArray();
              }),
              (this.fnAdjustColumnSizing = function (t) {
                var e = this.api(!0).columns.adjust(),
                  n = e.settings()[0],
                  r = n.oScroll;
                void 0 === t || t
                  ? e.draw(!1)
                  : ("" === r.sX && "" === r.sY) || zt(n);
              }),
              (this.fnClearTable = function (t) {
                var e = this.api(!0).clear();
                (void 0 === t || t) && e.draw();
              }),
              (this.fnClose = function (t) {
                this.api(!0).row(t).child.hide();
              }),
              (this.fnDeleteRow = function (t, e, n) {
                var r = this.api(!0),
                  o = r.rows(t),
                  i = o.settings()[0],
                  a = i.aoData[o[0][0]];
                return (
                  o.remove(),
                  e && e.call(this, i, a),
                  (void 0 === n || n) && r.draw(),
                  a
                );
              }),
              (this.fnDestroy = function (t) {
                this.api(!0).destroy(t);
              }),
              (this.fnDraw = function (t) {
                this.api(!0).draw(t);
              }),
              (this.fnFilter = function (t, e, n, r, o, i) {
                var a = this.api(!0);
                null == e
                  ? a.search(t, n, r, i)
                  : a.column(e).search(t, n, r, i),
                  a.draw();
              }),
              (this.fnGetData = function (t, e) {
                var n = this.api(!0);
                if (void 0 !== t) {
                  var r = t.nodeName ? t.nodeName.toLowerCase() : "";
                  return void 0 !== e || "td" == r || "th" == r
                    ? n.cell(t, e).data()
                    : n.row(t).data() || null;
                }
                return n.data().toArray();
              }),
              (this.fnGetNodes = function (t) {
                var e = this.api(!0);
                return void 0 !== t
                  ? e.row(t).node()
                  : e.rows().nodes().flatten().toArray();
              }),
              (this.fnGetPosition = function (t) {
                var e = this.api(!0),
                  n = t.nodeName.toUpperCase();
                if ("TR" == n) return e.row(t).index();
                if ("TD" == n || "TH" == n) {
                  var r = e.cell(t).index();
                  return [r.row, r.columnVisible, r.column];
                }
                return null;
              }),
              (this.fnIsOpen = function (t) {
                return this.api(!0).row(t).child.isShown();
              }),
              (this.fnOpen = function (t, e, n) {
                return this.api(!0).row(t).child(e, n).show().child()[0];
              }),
              (this.fnPageChange = function (t, e) {
                var n = this.api(!0).page(t);
                (void 0 === e || e) && n.draw(!1);
              }),
              (this.fnSetColumnVis = function (t, e, n) {
                var r = this.api(!0).column(t).visible(e);
                (void 0 === n || n) && r.columns.adjust().draw();
              }),
              (this.fnSettings = function () {
                return le(this[o.iApiIndex]);
              }),
              (this.fnSort = function (t) {
                this.api(!0).order(t).draw();
              }),
              (this.fnSortListener = function (t, e, n) {
                this.api(!0).order.listener(t, e, n);
              }),
              (this.fnUpdate = function (t, e, n, r, o) {
                var i = this.api(!0);
                return (
                  null == n ? i.row(e).data(t) : i.cell(e, n).data(t),
                  (void 0 === o || o) && i.columns.adjust(),
                  (void 0 === r || r) && i.draw(),
                  0
                );
              }),
              (this.fnVersionCheck = o.fnVersionCheck);
            var n = this,
              a = void 0 === e,
              s = this.length;
            for (var c in (a && (e = {}),
            (this.oApi = this.internal = o.internal),
            l.ext.internal))
              c && (this[c] = Ve(c));
            return (
              this.each(function () {
                var t,
                  o = s > 1 ? de({}, e, !0) : e,
                  i = 0,
                  c = this.getAttribute("id"),
                  u = !1,
                  d = l.defaults,
                  f = r(this);
                if ("table" == this.nodeName.toLowerCase()) {
                  L(d),
                    H(d.column),
                    F(d, d, !0),
                    F(d.column, d.column, !0),
                    F(d, r.extend(o, f.data()), !0);
                  var p = l.settings;
                  for (i = 0, t = p.length; i < t; i++) {
                    var h = p[i];
                    if (
                      h.nTable == this ||
                      (h.nTHead && h.nTHead.parentNode == this) ||
                      (h.nTFoot && h.nTFoot.parentNode == this)
                    ) {
                      var m =
                          void 0 !== o.bRetrieve ? o.bRetrieve : d.bRetrieve,
                        g = void 0 !== o.bDestroy ? o.bDestroy : d.bDestroy;
                      if (a || m) return h.oInstance;
                      if (g) {
                        h.oInstance.fnDestroy();
                        break;
                      }
                      return void ce(h, 0, "Cannot reinitialise DataTable", 3);
                    }
                    if (h.sTableId == this.id) {
                      p.splice(i, 1);
                      break;
                    }
                  }
                  (null !== c && "" !== c) ||
                    ((c = "DataTables_Table_" + l.ext._unique++),
                    (this.id = c));
                  var v = r.extend(!0, {}, l.models.oSettings, {
                    sDestroyWidth: f[0].style.width,
                    sInstance: c,
                    sTableId: c,
                  });
                  (v.nTable = this),
                    (v.oApi = n.internal),
                    (v.oInit = o),
                    p.push(v),
                    (v.oInstance = 1 === n.length ? n : f.dataTable()),
                    L(o),
                    k(o.oLanguage),
                    o.aLengthMenu &&
                      !o.iDisplayLength &&
                      (o.iDisplayLength = Array.isArray(o.aLengthMenu[0])
                        ? o.aLengthMenu[0][0]
                        : o.aLengthMenu[0]),
                    (o = de(r.extend(!0, {}, d), o)),
                    ue(v.oFeatures, o, [
                      "bPaginate",
                      "bLengthChange",
                      "bFilter",
                      "bSort",
                      "bSortMulti",
                      "bInfo",
                      "bProcessing",
                      "bAutoWidth",
                      "bSortClasses",
                      "bServerSide",
                      "bDeferRender",
                    ]),
                    ue(v, o, [
                      "asStripeClasses",
                      "ajax",
                      "fnServerData",
                      "fnFormatNumber",
                      "sServerMethod",
                      "aaSorting",
                      "aaSortingFixed",
                      "aLengthMenu",
                      "sPaginationType",
                      "sAjaxSource",
                      "sAjaxDataProp",
                      "iStateDuration",
                      "sDom",
                      "bSortCellsTop",
                      "iTabIndex",
                      "fnStateLoadCallback",
                      "fnStateSaveCallback",
                      "renderer",
                      "searchDelay",
                      "rowId",
                      ["iCookieDuration", "iStateDuration"],
                      ["oSearch", "oPreviousSearch"],
                      ["aoSearchCols", "aoPreSearchCols"],
                      ["iDisplayLength", "_iDisplayLength"],
                    ]),
                    ue(v.oScroll, o, [
                      ["sScrollX", "sX"],
                      ["sScrollXInner", "sXInner"],
                      ["sScrollY", "sY"],
                      ["bScrollCollapse", "bCollapse"],
                    ]),
                    ue(v.oLanguage, o, "fnInfoCallback"),
                    pe(v, "aoDrawCallback", o.fnDrawCallback, "user"),
                    pe(v, "aoServerParams", o.fnServerParams, "user"),
                    pe(v, "aoStateSaveParams", o.fnStateSaveParams, "user"),
                    pe(v, "aoStateLoadParams", o.fnStateLoadParams, "user"),
                    pe(v, "aoStateLoaded", o.fnStateLoaded, "user"),
                    pe(v, "aoRowCallback", o.fnRowCallback, "user"),
                    pe(v, "aoRowCreatedCallback", o.fnCreatedRow, "user"),
                    pe(v, "aoHeaderCallback", o.fnHeaderCallback, "user"),
                    pe(v, "aoFooterCallback", o.fnFooterCallback, "user"),
                    pe(v, "aoInitComplete", o.fnInitComplete, "user"),
                    pe(v, "aoPreDrawCallback", o.fnPreDrawCallback, "user"),
                    (v.rowIdFn = Z(o.rowId)),
                    j(v);
                  var b = v.oClasses;
                  if (
                    (r.extend(b, l.ext.classes, o.oClasses),
                    f.addClass(b.sTable),
                    void 0 === v.iInitDisplayStart &&
                      ((v.iInitDisplayStart = o.iDisplayStart),
                      (v._iDisplayStart = o.iDisplayStart)),
                    null !== o.iDeferLoading)
                  ) {
                    v.bDeferLoading = !0;
                    var y = Array.isArray(o.iDeferLoading);
                    (v._iRecordsDisplay = y
                      ? o.iDeferLoading[0]
                      : o.iDeferLoading),
                      (v._iRecordsTotal = y
                        ? o.iDeferLoading[1]
                        : o.iDeferLoading);
                  }
                  var x = v.oLanguage;
                  r.extend(!0, x, o.oLanguage),
                    x.sUrl
                      ? (r.ajax({
                          dataType: "json",
                          url: x.sUrl,
                          success: function (t) {
                            F(d.oLanguage, t),
                              k(t),
                              r.extend(!0, x, t, v.oInit.oLanguage),
                              he(v, null, "i18n", [v]),
                              jt(v);
                          },
                          error: function () {
                            jt(v);
                          },
                        }),
                        (u = !0))
                      : he(v, null, "i18n", [v]),
                    null === o.asStripeClasses &&
                      (v.asStripeClasses = [b.sStripeOdd, b.sStripeEven]);
                  var w = v.asStripeClasses,
                    S = f.children("tbody").find("tr").eq(0);
                  -1 !==
                    r.inArray(
                      !0,
                      r.map(w, function (t, e) {
                        return S.hasClass(t);
                      })
                    ) &&
                    (r("tbody tr", this).removeClass(w.join(" ")),
                    (v.asDestroyStripes = w.slice()));
                  var C,
                    _ = [],
                    T = this.getElementsByTagName("thead");
                  if (
                    (0 !== T.length && (ft(v.aoHeader, T[0]), (_ = pt(v))),
                    null === o.aoColumns)
                  )
                    for (C = [], i = 0, t = _.length; i < t; i++) C.push(null);
                  else C = o.aoColumns;
                  for (i = 0, t = C.length; i < t; i++) P(v, _ ? _[i] : null);
                  if (
                    ($(v, o.aoColumnDefs, C, function (t, e) {
                      B(v, t, e);
                    }),
                    S.length)
                  ) {
                    var D = function (t, e) {
                      return null !== t.getAttribute("data-" + e) ? e : null;
                    };
                    r(S[0])
                      .children("th, td")
                      .each(function (t, e) {
                        var n = v.aoColumns[t];
                        if (
                          (n || ce(v, 0, "Incorrect column count", 18),
                          n.mData === t)
                        ) {
                          var r = D(e, "sort") || D(e, "order"),
                            o = D(e, "filter") || D(e, "search");
                          (null === r && null === o) ||
                            ((n.mData = {
                              _: t + ".display",
                              sort: null !== r ? t + ".@data-" + r : void 0,
                              type: null !== r ? t + ".@data-" + r : void 0,
                              filter: null !== o ? t + ".@data-" + o : void 0,
                            }),
                            (n._isArrayHost = !0),
                            B(v, t));
                        }
                      });
                  }
                  var I = v.oFeatures,
                    A = function () {
                      if (void 0 === o.aaSorting) {
                        var e = v.aaSorting;
                        for (i = 0, t = e.length; i < t; i++)
                          e[i][1] = v.aoColumns[i].asSorting[0];
                      }
                      re(v),
                        I.bSort &&
                          pe(v, "aoDrawCallback", function () {
                            if (v.bSorted) {
                              var t = Zt(v),
                                e = {};
                              r.each(t, function (t, n) {
                                e[n.src] = n.dir;
                              }),
                                he(v, null, "order", [v, t, e]),
                                te(v);
                            }
                          }),
                        pe(
                          v,
                          "aoDrawCallback",
                          function () {
                            (v.bSorted || "ssp" === ve(v) || I.bDeferRender) &&
                              re(v);
                          },
                          "sc"
                        );
                      var n = f.children("caption").each(function () {
                          this._captionSide = r(this).css("caption-side");
                        }),
                        a = f.children("thead");
                      0 === a.length && (a = r("<thead/>").appendTo(f)),
                        (v.nTHead = a[0]);
                      var s = f.children("tbody");
                      0 === s.length && (s = r("<tbody/>").insertAfter(a)),
                        (v.nTBody = s[0]);
                      var l = f.children("tfoot");
                      if (
                        (0 === l.length &&
                          n.length > 0 &&
                          ("" !== v.oScroll.sX || "" !== v.oScroll.sY) &&
                          (l = r("<tfoot/>").appendTo(f)),
                        0 === l.length || 0 === l.children().length
                          ? f.addClass(b.sNoFooter)
                          : l.length > 0 &&
                            ((v.nTFoot = l[0]), ft(v.aoFooter, v.nTFoot)),
                        o.aaData)
                      )
                        for (i = 0; i < o.aaData.length; i++) U(v, o.aaData[i]);
                      else
                        (v.bDeferLoading || "dom" == ve(v)) &&
                          X(v, r(v.nTBody).children("tr"));
                      (v.aiDisplay = v.aiDisplayMaster.slice()),
                        (v.bInitialised = !0),
                        !1 === u && jt(v);
                    };
                  pe(v, "aoDrawCallback", ie, "state_save"),
                    o.bStateSave ? ((I.bStateSave = !0), ae(v, o, A)) : A();
                } else ce(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
              }),
              (n = null),
              this
            );
          },
          c = {},
          u = /[\r\n\u2028]/g,
          d = /<.*?>/g,
          f =
            /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
          p = new RegExp(
            "(\\" +
              [
                "/",
                ".",
                "*",
                "+",
                "?",
                "|",
                "(",
                ")",
                "[",
                "]",
                "{",
                "}",
                "\\",
                "$",
                "^",
                "-",
              ].join("|\\") +
              ")",
            "g"
          ),
          h = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
          m = function (t) {
            return !t || !0 === t || "-" === t;
          },
          g = function (t) {
            var e = parseInt(t, 10);
            return !isNaN(e) && isFinite(t) ? e : null;
          },
          v = function (t, e) {
            return (
              c[e] || (c[e] = new RegExp(Tt(e), "g")),
              "string" == typeof t && "." !== e
                ? t.replace(/\./g, "").replace(c[e], ".")
                : t
            );
          },
          b = function (t, e, n) {
            let r = typeof t;
            var o = "string" === r;
            return (
              "number" === r ||
              "bigint" === r ||
              !!m(t) ||
              (e && o && (t = v(t, e)),
              n && o && (t = t.replace(h, "")),
              !isNaN(parseFloat(t)) && isFinite(t))
            );
          },
          y = function (t, e, n) {
            if (m(t)) return !0;
            var r = (function (t) {
              return m(t) || "string" == typeof t;
            })(t);
            return (r && !!b(_(t), e, n)) || null;
          },
          x = function (t, e, n) {
            var r = [],
              o = 0,
              i = t.length;
            if (void 0 !== n)
              for (; o < i; o++) t[o] && t[o][e] && r.push(t[o][e][n]);
            else for (; o < i; o++) t[o] && r.push(t[o][e]);
            return r;
          },
          w = function (t, e, n, r) {
            var o = [],
              i = 0,
              a = e.length;
            if (void 0 !== r)
              for (; i < a; i++) t[e[i]][n] && o.push(t[e[i]][n][r]);
            else for (; i < a; i++) o.push(t[e[i]][n]);
            return o;
          },
          S = function (t, e) {
            var n,
              r = [];
            void 0 === e ? ((e = 0), (n = t)) : ((n = e), (e = t));
            for (var o = e; o < n; o++) r.push(o);
            return r;
          },
          C = function (t) {
            for (var e = [], n = 0, r = t.length; n < r; n++)
              t[n] && e.push(t[n]);
            return e;
          },
          _ = function (t) {
            return t.replace(d, "");
          },
          T = function (t) {
            if (
              (function (t) {
                if (t.length < 2) return !0;
                for (
                  var e = t.slice().sort(), n = e[0], r = 1, o = e.length;
                  r < o;
                  r++
                ) {
                  if (e[r] === n) return !1;
                  n = e[r];
                }
                return !0;
              })(t)
            )
              return t.slice();
            var e,
              n,
              r,
              o = [],
              i = t.length,
              a = 0;
            t: for (n = 0; n < i; n++) {
              for (e = t[n], r = 0; r < a; r++) if (o[r] === e) continue t;
              o.push(e), a++;
            }
            return o;
          },
          D = function (t, e) {
            if (Array.isArray(e)) for (var n = 0; n < e.length; n++) D(t, e[n]);
            else t.push(e);
            return t;
          },
          I = function (t, e) {
            return void 0 === e && (e = 0), -1 !== this.indexOf(t, e);
          };
        function A(t) {
          var e,
            n,
            o = {};
          r.each(t, function (r, i) {
            (e = r.match(/^([^A-Z]+?)([A-Z])/)) &&
              -1 !== "a aa ai ao as b fn i m o s ".indexOf(e[1] + " ") &&
              ((n = r.replace(e[0], e[2].toLowerCase())),
              (o[n] = r),
              "o" === e[1] && A(t[r]));
          }),
            (t._hungarianMap = o);
        }
        function F(t, e, n) {
          var o;
          t._hungarianMap || A(t),
            r.each(e, function (i, a) {
              void 0 === (o = t._hungarianMap[i]) ||
                (!n && void 0 !== e[o]) ||
                ("o" === o.charAt(0)
                  ? (e[o] || (e[o] = {}),
                    r.extend(!0, e[o], e[i]),
                    F(t[o], e[o], n))
                  : (e[o] = e[i]));
            });
        }
        function k(t) {
          var e = l.defaults.oLanguage,
            n = e.sDecimal;
          if ((n && Be(n), t)) {
            var r = t.sZeroRecords;
            !t.sEmptyTable &&
              r &&
              "No data available in table" === e.sEmptyTable &&
              ue(t, t, "sZeroRecords", "sEmptyTable"),
              !t.sLoadingRecords &&
                r &&
                "Loading..." === e.sLoadingRecords &&
                ue(t, t, "sZeroRecords", "sLoadingRecords"),
              t.sInfoThousands && (t.sThousands = t.sInfoThousands);
            var o = t.sDecimal;
            o && n !== o && Be(o);
          }
        }
        Array.isArray ||
          (Array.isArray = function (t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          }),
          Array.prototype.includes || (Array.prototype.includes = I),
          String.prototype.trim ||
            (String.prototype.trim = function () {
              return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            }),
          String.prototype.includes || (String.prototype.includes = I),
          (l.util = {
            throttle: function (t, e) {
              var n,
                r,
                o = void 0 !== e ? e : 200;
              return function () {
                var e = this,
                  i = +new Date(),
                  a = arguments;
                n && i < n + o
                  ? (clearTimeout(r),
                    (r = setTimeout(function () {
                      (n = void 0), t.apply(e, a);
                    }, o)))
                  : ((n = i), t.apply(e, a));
              };
            },
            escapeRegex: function (t) {
              return t.replace(p, "\\$1");
            },
            set: function (t) {
              if (r.isPlainObject(t)) return l.util.set(t._);
              if (null === t) return function () {};
              if ("function" == typeof t)
                return function (e, n, r) {
                  t(e, "set", n, r);
                };
              if (
                "string" != typeof t ||
                (-1 === t.indexOf(".") &&
                  -1 === t.indexOf("[") &&
                  -1 === t.indexOf("("))
              )
                return function (e, n) {
                  e[t] = n;
                };
              var e = function (t, n, r) {
                for (
                  var o,
                    i,
                    a,
                    s,
                    l,
                    c = Y(r),
                    u = c[c.length - 1],
                    d = 0,
                    f = c.length - 1;
                  d < f;
                  d++
                ) {
                  if ("__proto__" === c[d] || "constructor" === c[d])
                    throw new Error("Cannot set prototype values");
                  if (((i = c[d].match(K)), (a = c[d].match(G)), i)) {
                    if (
                      ((c[d] = c[d].replace(K, "")),
                      (t[c[d]] = []),
                      (o = c.slice()).splice(0, d + 1),
                      (l = o.join(".")),
                      Array.isArray(n))
                    )
                      for (var p = 0, h = n.length; p < h; p++)
                        e((s = {}), n[p], l), t[c[d]].push(s);
                    else t[c[d]] = n;
                    return;
                  }
                  a && ((c[d] = c[d].replace(G, "")), (t = t[c[d]](n))),
                    (null !== t[c[d]] && void 0 !== t[c[d]]) || (t[c[d]] = {}),
                    (t = t[c[d]]);
                }
                u.match(G)
                  ? (t = t[u.replace(G, "")](n))
                  : (t[u.replace(K, "")] = n);
              };
              return function (n, r) {
                return e(n, r, t);
              };
            },
            get: function (t) {
              if (r.isPlainObject(t)) {
                var e = {};
                return (
                  r.each(t, function (t, n) {
                    n && (e[t] = l.util.get(n));
                  }),
                  function (t, n, r, o) {
                    var i = e[n] || e._;
                    return void 0 !== i ? i(t, n, r, o) : t;
                  }
                );
              }
              if (null === t)
                return function (t) {
                  return t;
                };
              if ("function" == typeof t)
                return function (e, n, r, o) {
                  return t(e, n, r, o);
                };
              if (
                "string" != typeof t ||
                (-1 === t.indexOf(".") &&
                  -1 === t.indexOf("[") &&
                  -1 === t.indexOf("("))
              )
                return function (e, n) {
                  return e[t];
                };
              var n = function (t, e, r) {
                var o, i, a, s;
                if ("" !== r)
                  for (var l = Y(r), c = 0, u = l.length; c < u; c++) {
                    if (((o = l[c].match(K)), (i = l[c].match(G)), o)) {
                      if (
                        ((l[c] = l[c].replace(K, "")),
                        "" !== l[c] && (t = t[l[c]]),
                        (a = []),
                        l.splice(0, c + 1),
                        (s = l.join(".")),
                        Array.isArray(t))
                      )
                        for (var d = 0, f = t.length; d < f; d++)
                          a.push(n(t[d], e, s));
                      var p = o[0].substring(1, o[0].length - 1);
                      t = "" === p ? a : a.join(p);
                      break;
                    }
                    if (i) (l[c] = l[c].replace(G, "")), (t = t[l[c]]());
                    else {
                      if (null === t || void 0 === t[l[c]]) return;
                      t = t[l[c]];
                    }
                  }
                return t;
              };
              return function (e, r) {
                return n(e, r, t);
              };
            },
          });
        var N = function (t, e, n) {
          void 0 !== t[e] && (t[n] = t[e]);
        };
        function L(t) {
          N(t, "ordering", "bSort"),
            N(t, "orderMulti", "bSortMulti"),
            N(t, "orderClasses", "bSortClasses"),
            N(t, "orderCellsTop", "bSortCellsTop"),
            N(t, "order", "aaSorting"),
            N(t, "orderFixed", "aaSortingFixed"),
            N(t, "paging", "bPaginate"),
            N(t, "pagingType", "sPaginationType"),
            N(t, "pageLength", "iDisplayLength"),
            N(t, "searching", "bFilter"),
            "boolean" == typeof t.sScrollX &&
              (t.sScrollX = t.sScrollX ? "100%" : ""),
            "boolean" == typeof t.scrollX &&
              (t.scrollX = t.scrollX ? "100%" : "");
          var e = t.aoSearchCols;
          if (e)
            for (var n = 0, r = e.length; n < r; n++)
              e[n] && F(l.models.oSearch, e[n]);
        }
        function H(t) {
          N(t, "orderable", "bSortable"),
            N(t, "orderData", "aDataSort"),
            N(t, "orderSequence", "asSorting"),
            N(t, "orderDataType", "sortDataType");
          var e = t.aDataSort;
          "number" != typeof e || Array.isArray(e) || (t.aDataSort = [e]);
        }
        function j(t) {
          if (!l.__browser) {
            var e = {};
            l.__browser = e;
            var n = r("<div/>")
                .css({
                  position: "fixed",
                  top: 0,
                  left: -1 * r(window).scrollLeft(),
                  height: 1,
                  width: 1,
                  overflow: "hidden",
                })
                .append(
                  r("<div/>")
                    .css({
                      position: "absolute",
                      top: 1,
                      left: 1,
                      width: 100,
                      overflow: "scroll",
                    })
                    .append(r("<div/>").css({ width: "100%", height: 10 }))
                )
                .appendTo("body"),
              o = n.children(),
              i = o.children();
            (e.barWidth = o[0].offsetWidth - o[0].clientWidth),
              (e.bScrollOversize =
                100 === i[0].offsetWidth && 100 !== o[0].clientWidth),
              (e.bScrollbarLeft = 1 !== Math.round(i.offset().left)),
              (e.bBounding = !!n[0].getBoundingClientRect().width),
              n.remove();
          }
          r.extend(t.oBrowser, l.__browser),
            (t.oScroll.iBarWidth = l.__browser.barWidth);
        }
        function E(t, e, n, r, o, i) {
          var a,
            s = r,
            l = !1;
          for (void 0 !== n && ((a = n), (l = !0)); s !== o; )
            t.hasOwnProperty(s) &&
              ((a = l ? e(a, t[s], s, t) : t[s]), (l = !0), (s += i));
          return a;
        }
        function P(t, e) {
          var n = l.defaults.column,
            o = t.aoColumns.length,
            i = r.extend({}, l.models.oColumn, n, {
              nTh: e || document.createElement("th"),
              sTitle: n.sTitle ? n.sTitle : e ? e.innerHTML : "",
              aDataSort: n.aDataSort ? n.aDataSort : [o],
              mData: n.mData ? n.mData : o,
              idx: o,
            });
          t.aoColumns.push(i);
          var a = t.aoPreSearchCols;
          (a[o] = r.extend({}, l.models.oSearch, a[o])), B(t, o, r(e).data());
        }
        function B(t, e, n) {
          var o = t.aoColumns[e],
            i = t.oClasses,
            a = r(o.nTh);
          if (!o.sWidthOrig) {
            o.sWidthOrig = a.attr("width") || null;
            var s = (a.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            s && (o.sWidthOrig = s[1]);
          }
          if (null != n) {
            H(n),
              F(l.defaults.column, n, !0),
              void 0 === n.mDataProp || n.mData || (n.mData = n.mDataProp),
              n.sType && (o._sManualType = n.sType),
              n.className && !n.sClass && (n.sClass = n.className),
              n.sClass && a.addClass(n.sClass);
            var c = o.sClass;
            r.extend(o, n),
              ue(o, n, "sWidth", "sWidthOrig"),
              c !== o.sClass && (o.sClass = c + " " + o.sClass),
              void 0 !== n.iDataSort && (o.aDataSort = [n.iDataSort]),
              ue(o, n, "aDataSort");
          }
          var u = o.mData,
            d = Z(u),
            f = o.mRender ? Z(o.mRender) : null,
            p = function (t) {
              return "string" == typeof t && -1 !== t.indexOf("@");
            };
          (o._bAttrSrc =
            r.isPlainObject(u) && (p(u.sort) || p(u.type) || p(u.filter))),
            (o._setter = null),
            (o.fnGetData = function (t, e, n) {
              var r = d(t, e, void 0, n);
              return f && e ? f(r, e, t, n) : r;
            }),
            (o.fnSetData = function (t, e, n) {
              return Q(u)(t, e, n);
            }),
            "number" == typeof u || o._isArrayHost || (t._rowReadObject = !0),
            t.oFeatures.bSort ||
              ((o.bSortable = !1), a.addClass(i.sSortableNone));
          var h = -1 !== r.inArray("asc", o.asSorting),
            m = -1 !== r.inArray("desc", o.asSorting);
          o.bSortable && (h || m)
            ? h && !m
              ? ((o.sSortingClass = i.sSortableAsc),
                (o.sSortingClassJUI = i.sSortJUIAscAllowed))
              : !h && m
              ? ((o.sSortingClass = i.sSortableDesc),
                (o.sSortingClassJUI = i.sSortJUIDescAllowed))
              : ((o.sSortingClass = i.sSortable),
                (o.sSortingClassJUI = i.sSortJUI))
            : ((o.sSortingClass = i.sSortableNone), (o.sSortingClassJUI = ""));
        }
        function O(t) {
          if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            Xt(t);
            for (var n = 0, r = e.length; n < r; n++)
              e[n].nTh.style.width = e[n].sWidth;
          }
          var o = t.oScroll;
          ("" === o.sY && "" === o.sX) || zt(t),
            he(t, null, "column-sizing", [t]);
        }
        function R(t, e) {
          var n = q(t, "bVisible");
          return "number" == typeof n[e] ? n[e] : null;
        }
        function M(t, e) {
          var n = q(t, "bVisible"),
            o = r.inArray(e, n);
          return -1 !== o ? o : null;
        }
        function W(t) {
          var e = 0;
          return (
            r.each(t.aoColumns, function (t, n) {
              n.bVisible && "none" !== r(n.nTh).css("display") && e++;
            }),
            e
          );
        }
        function q(t, e) {
          var n = [];
          return (
            r.map(t.aoColumns, function (t, r) {
              t[e] && n.push(r);
            }),
            n
          );
        }
        function z(t) {
          var e,
            n,
            r,
            o,
            i,
            a,
            s,
            c,
            u,
            d = t.aoColumns,
            f = t.aoData,
            p = l.ext.type.detect;
          for (e = 0, n = d.length; e < n; e++)
            if (((u = []), !(s = d[e]).sType && s._sManualType))
              s.sType = s._sManualType;
            else if (!s.sType) {
              for (r = 0, o = p.length; r < o; r++) {
                for (
                  i = 0, a = f.length;
                  i < a &&
                  (void 0 === u[i] && (u[i] = V(t, i, e, "type")),
                  (c = p[r](u[i], t)) || r === p.length - 1) &&
                  ("html" !== c || m(u[i]));
                  i++
                );
                if (c) {
                  s.sType = c;
                  break;
                }
              }
              s.sType || (s.sType = "string");
            }
        }
        function $(t, e, n, o) {
          var i,
            a,
            s,
            l,
            c,
            u,
            d,
            f = t.aoColumns;
          if (e)
            for (i = e.length - 1; i >= 0; i--) {
              var p =
                void 0 !== (d = e[i]).target
                  ? d.target
                  : void 0 !== d.targets
                  ? d.targets
                  : d.aTargets;
              for (
                Array.isArray(p) || (p = [p]), s = 0, l = p.length;
                s < l;
                s++
              )
                if ("number" == typeof p[s] && p[s] >= 0) {
                  for (; f.length <= p[s]; ) P(t);
                  o(p[s], d);
                } else if ("number" == typeof p[s] && p[s] < 0)
                  o(f.length + p[s], d);
                else if ("string" == typeof p[s])
                  for (c = 0, u = f.length; c < u; c++)
                    ("_all" == p[s] || r(f[c].nTh).hasClass(p[s])) && o(c, d);
            }
          if (n) for (i = 0, a = n.length; i < a; i++) o(i, n[i]);
        }
        function U(t, e, n, o) {
          var i = t.aoData.length,
            a = r.extend(!0, {}, l.models.oRow, {
              src: n ? "dom" : "data",
              idx: i,
            });
          (a._aData = e), t.aoData.push(a);
          for (var s = t.aoColumns, c = 0, u = s.length; c < u; c++)
            s[c].sType = null;
          t.aiDisplayMaster.push(i);
          var d = t.rowIdFn(e);
          return (
            void 0 !== d && (t.aIds[d] = a),
            (!n && t.oFeatures.bDeferRender) || it(t, i, n, o),
            i
          );
        }
        function X(t, e) {
          var n;
          return (
            e instanceof r || (e = r(e)),
            e.map(function (e, r) {
              return (n = ot(t, r)), U(t, n.data, r, n.cells);
            })
          );
        }
        function V(t, e, n, r) {
          "search" === r ? (r = "filter") : "order" === r && (r = "sort");
          var o = t.iDraw,
            i = t.aoColumns[n],
            a = t.aoData[e]._aData,
            s = i.sDefaultContent,
            c = i.fnGetData(a, r, { settings: t, row: e, col: n });
          if (void 0 === c)
            return (
              t.iDrawError != o &&
                null === s &&
                (ce(
                  t,
                  0,
                  "Requested unknown parameter " +
                    ("function" == typeof i.mData
                      ? "{function}"
                      : "'" + i.mData + "'") +
                    " for row " +
                    e +
                    ", column " +
                    n,
                  4
                ),
                (t.iDrawError = o)),
              s
            );
          if ((c !== a && null !== c) || null === s || void 0 === r) {
            if ("function" == typeof c) return c.call(a);
          } else c = s;
          if (null === c && "display" === r) return "";
          if ("filter" === r) {
            var u = l.ext.type.search;
            u[i.sType] && (c = u[i.sType](c));
          }
          return c;
        }
        function J(t, e, n, r) {
          var o = t.aoColumns[n],
            i = t.aoData[e]._aData;
          o.fnSetData(i, r, { settings: t, row: e, col: n });
        }
        var K = /\[.*?\]$/,
          G = /\(\)$/;
        function Y(t) {
          return r.map(t.match(/(\\.|[^\.])+/g) || [""], function (t) {
            return t.replace(/\\\./g, ".");
          });
        }
        var Z = l.util.get,
          Q = l.util.set;
        function tt(t) {
          return x(t.aoData, "_aData");
        }
        function et(t) {
          (t.aoData.length = 0),
            (t.aiDisplayMaster.length = 0),
            (t.aiDisplay.length = 0),
            (t.aIds = {});
        }
        function nt(t, e, n) {
          for (var r = -1, o = 0, i = t.length; o < i; o++)
            t[o] == e ? (r = o) : t[o] > e && t[o]--;
          -1 != r && void 0 === n && t.splice(r, 1);
        }
        function rt(t, e, n, r) {
          var o,
            i,
            a = t.aoData[e],
            s = function (n, r) {
              for (; n.childNodes.length; ) n.removeChild(n.firstChild);
              n.innerHTML = V(t, e, r, "display");
            };
          if ("dom" !== n && ((n && "auto" !== n) || "dom" !== a.src)) {
            var l = a.anCells;
            if (l)
              if (void 0 !== r) s(l[r], r);
              else for (o = 0, i = l.length; o < i; o++) s(l[o], o);
          } else a._aData = ot(t, a, r, void 0 === r ? void 0 : a._aData).data;
          (a._aSortData = null), (a._aFilterData = null);
          var c = t.aoColumns;
          if (void 0 !== r) c[r].sType = null;
          else {
            for (o = 0, i = c.length; o < i; o++) c[o].sType = null;
            at(t, a);
          }
        }
        function ot(t, e, n, r) {
          var o,
            i,
            a,
            s = [],
            l = e.firstChild,
            c = 0,
            u = t.aoColumns,
            d = t._rowReadObject;
          r = void 0 !== r ? r : d ? {} : [];
          var f = function (t, e) {
              if ("string" == typeof t) {
                var n = t.indexOf("@");
                if (-1 !== n) {
                  var o = t.substring(n + 1);
                  Q(t)(r, e.getAttribute(o));
                }
              }
            },
            p = function (t) {
              (void 0 !== n && n !== c) ||
                ((i = u[c]),
                (a = t.innerHTML.trim()),
                i && i._bAttrSrc
                  ? (Q(i.mData._)(r, a),
                    f(i.mData.sort, t),
                    f(i.mData.type, t),
                    f(i.mData.filter, t))
                  : d
                  ? (i._setter || (i._setter = Q(i.mData)), i._setter(r, a))
                  : (r[c] = a));
              c++;
            };
          if (l)
            for (; l; )
              ("TD" != (o = l.nodeName.toUpperCase()) && "TH" != o) ||
                (p(l), s.push(l)),
                (l = l.nextSibling);
          else for (var h = 0, m = (s = e.anCells).length; h < m; h++) p(s[h]);
          var g = e.firstChild ? e : e.nTr;
          if (g) {
            var v = g.getAttribute("id");
            v && Q(t.rowId)(r, v);
          }
          return { data: r, cells: s };
        }
        function it(t, e, n, o) {
          var i,
            a,
            s,
            l,
            c,
            u,
            d = t.aoData[e],
            f = d._aData,
            p = [];
          if (null === d.nTr) {
            for (
              i = n || document.createElement("tr"),
                d.nTr = i,
                d.anCells = p,
                i._DT_RowIndex = e,
                at(t, d),
                l = 0,
                c = t.aoColumns.length;
              l < c;
              l++
            )
              (s = t.aoColumns[l]),
                (a = (u = !n) ? document.createElement(s.sCellType) : o[l]) ||
                  ce(t, 0, "Incorrect column count", 18),
                (a._DT_CellIndex = { row: e, column: l }),
                p.push(a),
                (!u &&
                  ((!s.mRender && s.mData === l) ||
                    (r.isPlainObject(s.mData) &&
                      s.mData._ === l + ".display"))) ||
                  (a.innerHTML = V(t, e, l, "display")),
                s.sClass && (a.className += " " + s.sClass),
                s.bVisible && !n
                  ? i.appendChild(a)
                  : !s.bVisible && n && a.parentNode.removeChild(a),
                s.fnCreatedCell &&
                  s.fnCreatedCell.call(t.oInstance, a, V(t, e, l), f, e, l);
            he(t, "aoRowCreatedCallback", null, [i, f, e, p]);
          }
        }
        function at(t, e) {
          var n = e.nTr,
            o = e._aData;
          if (n) {
            var i = t.rowIdFn(o);
            if ((i && (n.id = i), o.DT_RowClass)) {
              var a = o.DT_RowClass.split(" ");
              (e.__rowc = e.__rowc ? T(e.__rowc.concat(a)) : a),
                r(n).removeClass(e.__rowc.join(" ")).addClass(o.DT_RowClass);
            }
            o.DT_RowAttr && r(n).attr(o.DT_RowAttr),
              o.DT_RowData && r(n).data(o.DT_RowData);
          }
        }
        function st(t) {
          var e,
            n,
            o,
            i,
            a,
            s = t.nTHead,
            l = t.nTFoot,
            c = 0 === r("th, td", s).length,
            u = t.oClasses,
            d = t.aoColumns;
          for (
            c && (i = r("<tr/>").appendTo(s)), e = 0, n = d.length;
            e < n;
            e++
          )
            (a = d[e]),
              (o = r(a.nTh).addClass(a.sClass)),
              c && o.appendTo(i),
              t.oFeatures.bSort &&
                (o.addClass(a.sSortingClass),
                !1 !== a.bSortable &&
                  (o
                    .attr("tabindex", t.iTabIndex)
                    .attr("aria-controls", t.sTableId),
                  ne(t, a.nTh, e))),
              a.sTitle != o[0].innerHTML && o.html(a.sTitle),
              ge(t, "header")(t, o, a, u);
          if (
            (c && ft(t.aoHeader, s),
            r(s).children("tr").children("th, td").addClass(u.sHeaderTH),
            r(l).children("tr").children("th, td").addClass(u.sFooterTH),
            null !== l)
          ) {
            var f = t.aoFooter[0];
            for (e = 0, n = f.length; e < n; e++)
              (a = d[e])
                ? ((a.nTf = f[e].cell), a.sClass && r(a.nTf).addClass(a.sClass))
                : ce(t, 0, "Incorrect column count", 18);
          }
        }
        function lt(t, e, n) {
          var o,
            i,
            a,
            s,
            l,
            c,
            u,
            d,
            f,
            p = [],
            h = [],
            m = t.aoColumns.length;
          if (e) {
            for (void 0 === n && (n = !1), o = 0, i = e.length; o < i; o++) {
              for (
                p[o] = e[o].slice(), p[o].nTr = e[o].nTr, a = m - 1;
                a >= 0;
                a--
              )
                t.aoColumns[a].bVisible || n || p[o].splice(a, 1);
              h.push([]);
            }
            for (o = 0, i = p.length; o < i; o++) {
              if ((u = p[o].nTr)) for (; (c = u.firstChild); ) u.removeChild(c);
              for (a = 0, s = p[o].length; a < s; a++)
                if (((d = 1), (f = 1), void 0 === h[o][a])) {
                  for (
                    u.appendChild(p[o][a].cell), h[o][a] = 1;
                    void 0 !== p[o + d] && p[o][a].cell == p[o + d][a].cell;

                  )
                    (h[o + d][a] = 1), d++;
                  for (
                    ;
                    void 0 !== p[o][a + f] && p[o][a].cell == p[o][a + f].cell;

                  ) {
                    for (l = 0; l < d; l++) h[o + l][a + f] = 1;
                    f++;
                  }
                  r(p[o][a].cell).attr("rowspan", d).attr("colspan", f);
                }
            }
          }
        }
        function ct(t, e) {
          !(function (t) {
            var e = "ssp" == ve(t),
              n = t.iInitDisplayStart;
            void 0 !== n &&
              -1 !== n &&
              ((t._iDisplayStart = e ? n : n >= t.fnRecordsDisplay() ? 0 : n),
              (t.iInitDisplayStart = -1));
          })(t);
          var n = he(t, "aoPreDrawCallback", "preDraw", [t]);
          if (-1 === r.inArray(!1, n)) {
            var o = [],
              i = 0,
              a = t.asStripeClasses,
              s = a.length,
              l = t.oLanguage,
              c = "ssp" == ve(t),
              u = t.aiDisplay,
              d = t._iDisplayStart,
              f = t.fnDisplayEnd();
            if (((t.bDrawing = !0), t.bDeferLoading))
              (t.bDeferLoading = !1), t.iDraw++, Wt(t, !1);
            else if (c) {
              if (!t.bDestroying && !e) return void mt(t);
            } else t.iDraw++;
            if (0 !== u.length)
              for (
                var p = c ? 0 : d, h = c ? t.aoData.length : f, m = p;
                m < h;
                m++
              ) {
                var g = u[m],
                  v = t.aoData[g];
                null === v.nTr && it(t, g);
                var b = v.nTr;
                if (0 !== s) {
                  var y = a[i % s];
                  v._sRowStripe != y &&
                    (r(b).removeClass(v._sRowStripe).addClass(y),
                    (v._sRowStripe = y));
                }
                he(t, "aoRowCallback", null, [b, v._aData, i, m, g]),
                  o.push(b),
                  i++;
              }
            else {
              var x = l.sZeroRecords;
              1 == t.iDraw && "ajax" == ve(t)
                ? (x = l.sLoadingRecords)
                : l.sEmptyTable &&
                  0 === t.fnRecordsTotal() &&
                  (x = l.sEmptyTable),
                (o[0] = r("<tr/>", { class: s ? a[0] : "" }).append(
                  r("<td />", {
                    valign: "top",
                    colSpan: W(t),
                    class: t.oClasses.sRowEmpty,
                  }).html(x)
                )[0]);
            }
            he(t, "aoHeaderCallback", "header", [
              r(t.nTHead).children("tr")[0],
              tt(t),
              d,
              f,
              u,
            ]),
              he(t, "aoFooterCallback", "footer", [
                r(t.nTFoot).children("tr")[0],
                tt(t),
                d,
                f,
                u,
              ]);
            var w = r(t.nTBody);
            w.children().detach(),
              w.append(r(o)),
              he(t, "aoDrawCallback", "draw", [t]),
              (t.bSorted = !1),
              (t.bFiltered = !1),
              (t.bDrawing = !1);
          } else Wt(t, !1);
        }
        function ut(t, e) {
          var n = t.oFeatures,
            r = n.bSort,
            o = n.bFilter;
          r && Qt(t),
            o
              ? xt(t, t.oPreviousSearch)
              : (t.aiDisplay = t.aiDisplayMaster.slice()),
            !0 !== e && (t._iDisplayStart = 0),
            (t._drawHold = e),
            ct(t),
            (t._drawHold = !1);
        }
        function dt(t) {
          var e = t.oClasses,
            n = r(t.nTable),
            o = r("<div/>").insertBefore(n),
            i = t.oFeatures,
            a = r("<div/>", {
              id: t.sTableId + "_wrapper",
              class: e.sWrapper + (t.nTFoot ? "" : " " + e.sNoFooter),
            });
          (t.nHolding = o[0]),
            (t.nTableWrapper = a[0]),
            (t.nTableReinsertBefore = t.nTable.nextSibling);
          for (
            var s, c, u, d, f, p, h = t.sDom.split(""), m = 0;
            m < h.length;
            m++
          ) {
            if (((s = null), "<" == (c = h[m]))) {
              if (((u = r("<div/>")[0]), "'" == (d = h[m + 1]) || '"' == d)) {
                for (f = "", p = 2; h[m + p] != d; ) (f += h[m + p]), p++;
                if (
                  ("H" == f
                    ? (f = e.sJUIHeader)
                    : "F" == f && (f = e.sJUIFooter),
                  -1 != f.indexOf("."))
                ) {
                  var g = f.split(".");
                  (u.id = g[0].substr(1, g[0].length - 1)),
                    (u.className = g[1]);
                } else
                  "#" == f.charAt(0)
                    ? (u.id = f.substr(1, f.length - 1))
                    : (u.className = f);
                m += p;
              }
              a.append(u), (a = r(u));
            } else if (">" == c) a = a.parent();
            else if ("l" == c && i.bPaginate && i.bLengthChange) s = Bt(t);
            else if ("f" == c && i.bFilter) s = yt(t);
            else if ("r" == c && i.bProcessing) s = Mt(t);
            else if ("t" == c) s = qt(t);
            else if ("i" == c && i.bInfo) s = Nt(t);
            else if ("p" == c && i.bPaginate) s = Ot(t);
            else if (0 !== l.ext.feature.length)
              for (var v = l.ext.feature, b = 0, y = v.length; b < y; b++)
                if (c == v[b].cFeature) {
                  s = v[b].fnInit(t);
                  break;
                }
            if (s) {
              var x = t.aanFeatures;
              x[c] || (x[c] = []), x[c].push(s), a.append(s);
            }
          }
          o.replaceWith(a), (t.nHolding = null);
        }
        function ft(t, e) {
          var n,
            o,
            i,
            a,
            s,
            l,
            c,
            u,
            d,
            f,
            p = r(e).children("tr"),
            h = function (t, e, n) {
              for (var r = t[e]; r[n]; ) n++;
              return n;
            };
          for (t.splice(0, t.length), i = 0, l = p.length; i < l; i++)
            t.push([]);
          for (i = 0, l = p.length; i < l; i++)
            for (0, o = (n = p[i]).firstChild; o; ) {
              if (
                "TD" == o.nodeName.toUpperCase() ||
                "TH" == o.nodeName.toUpperCase()
              )
                for (
                  u =
                    (u = 1 * o.getAttribute("colspan")) && 0 !== u && 1 !== u
                      ? u
                      : 1,
                    d =
                      (d = 1 * o.getAttribute("rowspan")) && 0 !== d && 1 !== d
                        ? d
                        : 1,
                    c = h(t, i, 0),
                    f = 1 === u,
                    s = 0;
                  s < u;
                  s++
                )
                  for (a = 0; a < d; a++)
                    (t[i + a][c + s] = { cell: o, unique: f }),
                      (t[i + a].nTr = n);
              o = o.nextSibling;
            }
        }
        function pt(t, e, n) {
          var r = [];
          n || ((n = t.aoHeader), e && ft((n = []), e));
          for (var o = 0, i = n.length; o < i; o++)
            for (var a = 0, s = n[o].length; a < s; a++)
              !n[o][a].unique ||
                (r[a] && t.bSortCellsTop) ||
                (r[a] = n[o][a].cell);
          return r;
        }
        function ht(t, e, n) {
          if (
            (he(t, "aoServerParams", "serverParams", [e]),
            e && Array.isArray(e))
          ) {
            var o = {},
              i = /(.*?)\[\]$/;
            r.each(e, function (t, e) {
              var n = e.name.match(i);
              if (n) {
                var r = n[0];
                o[r] || (o[r] = []), o[r].push(e.value);
              } else o[e.name] = e.value;
            }),
              (e = o);
          }
          var a,
            s = t.ajax,
            l = t.oInstance,
            c = function (e) {
              var r = t.jqXHR ? t.jqXHR.status : null;
              (null === e || ("number" == typeof r && 204 == r)) &&
                bt(t, (e = {}), []);
              var o = e.error || e.sError;
              o && ce(t, 0, o),
                (t.json = e),
                he(t, null, "xhr", [t, e, t.jqXHR]),
                n(e);
            };
          if (r.isPlainObject(s) && s.data) {
            var u = "function" == typeof (a = s.data) ? a(e, t) : a;
            (e = "function" == typeof a && u ? u : r.extend(!0, e, u)),
              delete s.data;
          }
          var d = {
            data: e,
            success: c,
            dataType: "json",
            cache: !1,
            type: t.sServerMethod,
            error: function (e, n, o) {
              var i = he(t, null, "xhr", [t, null, t.jqXHR]);
              -1 === r.inArray(!0, i) &&
                ("parsererror" == n
                  ? ce(t, 0, "Invalid JSON response", 1)
                  : 4 === e.readyState && ce(t, 0, "Ajax error", 7)),
                Wt(t, !1);
            },
          };
          (t.oAjaxData = e),
            he(t, null, "preXhr", [t, e]),
            t.fnServerData
              ? t.fnServerData.call(
                  l,
                  t.sAjaxSource,
                  r.map(e, function (t, e) {
                    return { name: e, value: t };
                  }),
                  c,
                  t
                )
              : t.sAjaxSource || "string" == typeof s
              ? (t.jqXHR = r.ajax(r.extend(d, { url: s || t.sAjaxSource })))
              : "function" == typeof s
              ? (t.jqXHR = s.call(l, e, c, t))
              : ((t.jqXHR = r.ajax(r.extend(d, s))), (s.data = a));
        }
        function mt(t) {
          t.iDraw++,
            Wt(t, !0),
            ht(t, gt(t), function (e) {
              vt(t, e);
            });
        }
        function gt(t) {
          var e,
            n,
            o,
            i,
            a = t.aoColumns,
            s = a.length,
            c = t.oFeatures,
            u = t.oPreviousSearch,
            d = t.aoPreSearchCols,
            f = [],
            p = Zt(t),
            h = t._iDisplayStart,
            m = !1 !== c.bPaginate ? t._iDisplayLength : -1,
            g = function (t, e) {
              f.push({ name: t, value: e });
            };
          g("sEcho", t.iDraw),
            g("iColumns", s),
            g("sColumns", x(a, "sName").join(",")),
            g("iDisplayStart", h),
            g("iDisplayLength", m);
          var v = {
            draw: t.iDraw,
            columns: [],
            order: [],
            start: h,
            length: m,
            search: { value: u.sSearch, regex: u.bRegex },
          };
          for (e = 0; e < s; e++)
            (o = a[e]),
              (i = d[e]),
              (n = "function" == typeof o.mData ? "function" : o.mData),
              v.columns.push({
                data: n,
                name: o.sName,
                searchable: o.bSearchable,
                orderable: o.bSortable,
                search: { value: i.sSearch, regex: i.bRegex },
              }),
              g("mDataProp_" + e, n),
              c.bFilter &&
                (g("sSearch_" + e, i.sSearch),
                g("bRegex_" + e, i.bRegex),
                g("bSearchable_" + e, o.bSearchable)),
              c.bSort && g("bSortable_" + e, o.bSortable);
          c.bFilter && (g("sSearch", u.sSearch), g("bRegex", u.bRegex)),
            c.bSort &&
              (r.each(p, function (t, e) {
                v.order.push({ column: e.col, dir: e.dir }),
                  g("iSortCol_" + t, e.col),
                  g("sSortDir_" + t, e.dir);
              }),
              g("iSortingCols", p.length));
          var b = l.ext.legacy.ajax;
          return null === b ? (t.sAjaxSource ? f : v) : b ? f : v;
        }
        function vt(t, e) {
          var n = function (t, n) {
              return void 0 !== e[t] ? e[t] : e[n];
            },
            r = bt(t, e),
            o = n("sEcho", "draw"),
            i = n("iTotalRecords", "recordsTotal"),
            a = n("iTotalDisplayRecords", "recordsFiltered");
          if (void 0 !== o) {
            if (1 * o < t.iDraw) return;
            t.iDraw = 1 * o;
          }
          r || (r = []),
            et(t),
            (t._iRecordsTotal = parseInt(i, 10)),
            (t._iRecordsDisplay = parseInt(a, 10));
          for (var s = 0, l = r.length; s < l; s++) U(t, r[s]);
          (t.aiDisplay = t.aiDisplayMaster.slice()),
            ct(t, !0),
            t._bInitComplete || Et(t, e),
            Wt(t, !1);
        }
        function bt(t, e, n) {
          var o =
            r.isPlainObject(t.ajax) && void 0 !== t.ajax.dataSrc
              ? t.ajax.dataSrc
              : t.sAjaxDataProp;
          if (!n)
            return "data" === o ? e.aaData || e[o] : "" !== o ? Z(o)(e) : e;
          Q(o)(e, n);
        }
        function yt(t) {
          var e = t.oClasses,
            n = t.sTableId,
            o = t.oLanguage,
            i = t.oPreviousSearch,
            a = t.aanFeatures,
            s = '<input type="search" class="' + e.sFilterInput + '"/>',
            l = o.sSearch;
          l = l.match(/_INPUT_/) ? l.replace("_INPUT_", s) : l + s;
          var c = r("<div/>", {
              id: a.f ? null : n + "_filter",
              class: e.sFilter,
            }).append(r("<label/>").append(l)),
            u = function (e) {
              a.f;
              var n = this.value ? this.value : "";
              (i.return && "Enter" !== e.key) ||
                (n != i.sSearch &&
                  (xt(t, {
                    sSearch: n,
                    bRegex: i.bRegex,
                    bSmart: i.bSmart,
                    bCaseInsensitive: i.bCaseInsensitive,
                    return: i.return,
                  }),
                  (t._iDisplayStart = 0),
                  ct(t)));
            },
            d =
              null !== t.searchDelay
                ? t.searchDelay
                : "ssp" === ve(t)
                ? 400
                : 0,
            f = r("input", c)
              .val(i.sSearch)
              .attr("placeholder", o.sSearchPlaceholder)
              .on(
                "keyup.DT search.DT input.DT paste.DT cut.DT",
                d ? Vt(u, d) : u
              )
              .on("mouseup", function (t) {
                setTimeout(function () {
                  u.call(f[0], t);
                }, 10);
              })
              .on("keypress.DT", function (t) {
                if (13 == t.keyCode) return !1;
              })
              .attr("aria-controls", n);
          return (
            r(t.nTable).on("search.dt.DT", function (e, n) {
              if (t === n)
                try {
                  f[0] !== document.activeElement && f.val(i.sSearch);
                } catch (t) {}
            }),
            c[0]
          );
        }
        function xt(t, e, n) {
          var r = t.oPreviousSearch,
            o = t.aoPreSearchCols,
            i = function (t) {
              (r.sSearch = t.sSearch),
                (r.bRegex = t.bRegex),
                (r.bSmart = t.bSmart),
                (r.bCaseInsensitive = t.bCaseInsensitive),
                (r.return = t.return);
            },
            a = function (t) {
              return void 0 !== t.bEscapeRegex ? !t.bEscapeRegex : t.bRegex;
            };
          if ((z(t), "ssp" != ve(t))) {
            Ct(t, e.sSearch, n, a(e), e.bSmart, e.bCaseInsensitive, e.return),
              i(e);
            for (var s = 0; s < o.length; s++)
              St(
                t,
                o[s].sSearch,
                s,
                a(o[s]),
                o[s].bSmart,
                o[s].bCaseInsensitive
              );
            wt(t);
          } else i(e);
          (t.bFiltered = !0), he(t, null, "search", [t]);
        }
        function wt(t) {
          for (
            var e, n, o = l.ext.search, i = t.aiDisplay, a = 0, s = o.length;
            a < s;
            a++
          ) {
            for (var c = [], u = 0, d = i.length; u < d; u++)
              (n = i[u]),
                (e = t.aoData[n]),
                o[a](t, e._aFilterData, n, e._aData, u) && c.push(n);
            (i.length = 0), r.merge(i, c);
          }
        }
        function St(t, e, n, r, o, i) {
          if ("" !== e) {
            for (
              var a, s = [], l = t.aiDisplay, c = _t(e, r, o, i), u = 0;
              u < l.length;
              u++
            )
              (a = t.aoData[l[u]]._aFilterData[n]), c.test(a) && s.push(l[u]);
            t.aiDisplay = s;
          }
        }
        function Ct(t, e, n, r, o, i) {
          var a,
            s,
            c,
            u = _t(e, r, o, i),
            d = t.oPreviousSearch.sSearch,
            f = t.aiDisplayMaster,
            p = [];
          if (
            (0 !== l.ext.search.length && (n = !0), (s = At(t)), e.length <= 0)
          )
            t.aiDisplay = f.slice();
          else {
            for (
              (s ||
                n ||
                r ||
                d.length > e.length ||
                0 !== e.indexOf(d) ||
                t.bSorted) &&
                (t.aiDisplay = f.slice()),
                a = t.aiDisplay,
                c = 0;
              c < a.length;
              c++
            )
              u.test(t.aoData[a[c]]._sFilterRow) && p.push(a[c]);
            t.aiDisplay = p;
          }
        }
        function _t(t, e, n, o) {
          if (((t = e ? t : Tt(t)), n)) {
            var i = r.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function (t) {
              if ('"' === t.charAt(0)) {
                var e = t.match(/^"(.*)"$/);
                t = e ? e[1] : t;
              }
              return t.replace('"', "");
            });
            t = "^(?=.*?" + i.join(")(?=.*?") + ").*$";
          }
          return new RegExp(t, o ? "i" : "");
        }
        var Tt = l.util.escapeRegex,
          Dt = r("<div>")[0],
          It = void 0 !== Dt.textContent;
        function At(t) {
          var e,
            n,
            r,
            o,
            i,
            a,
            s,
            l = t.aoColumns,
            c = !1;
          for (e = 0, r = t.aoData.length; e < r; e++)
            if (!(s = t.aoData[e])._aFilterData) {
              for (i = [], n = 0, o = l.length; n < o; n++)
                l[n].bSearchable
                  ? (null === (a = V(t, e, n, "filter")) && (a = ""),
                    "string" != typeof a && a.toString && (a = a.toString()))
                  : (a = ""),
                  a.indexOf &&
                    -1 !== a.indexOf("&") &&
                    ((Dt.innerHTML = a),
                    (a = It ? Dt.textContent : Dt.innerText)),
                  a.replace && (a = a.replace(/[\r\n\u2028]/g, "")),
                  i.push(a);
              (s._aFilterData = i), (s._sFilterRow = i.join("  ")), (c = !0);
            }
          return c;
        }
        function Ft(t) {
          return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive,
          };
        }
        function kt(t) {
          return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive,
          };
        }
        function Nt(t) {
          var e = t.sTableId,
            n = t.aanFeatures.i,
            o = r("<div/>", {
              class: t.oClasses.sInfo,
              id: n ? null : e + "_info",
            });
          return (
            n ||
              (t.aoDrawCallback.push({ fn: Lt, sName: "information" }),
              o.attr("role", "status").attr("aria-live", "polite"),
              r(t.nTable).attr("aria-describedby", e + "_info")),
            o[0]
          );
        }
        function Lt(t) {
          var e = t.aanFeatures.i;
          if (0 !== e.length) {
            var n = t.oLanguage,
              o = t._iDisplayStart + 1,
              i = t.fnDisplayEnd(),
              a = t.fnRecordsTotal(),
              s = t.fnRecordsDisplay(),
              l = s ? n.sInfo : n.sInfoEmpty;
            s !== a && (l += " " + n.sInfoFiltered),
              (l = Ht(t, (l += n.sInfoPostFix)));
            var c = n.fnInfoCallback;
            null !== c && (l = c.call(t.oInstance, t, o, i, a, s, l)),
              r(e).html(l);
          }
        }
        function Ht(t, e) {
          var n = t.fnFormatNumber,
            r = t._iDisplayStart + 1,
            o = t._iDisplayLength,
            i = t.fnRecordsDisplay(),
            a = -1 === o;
          return e
            .replace(/_START_/g, n.call(t, r))
            .replace(/_END_/g, n.call(t, t.fnDisplayEnd()))
            .replace(/_MAX_/g, n.call(t, t.fnRecordsTotal()))
            .replace(/_TOTAL_/g, n.call(t, i))
            .replace(/_PAGE_/g, n.call(t, a ? 1 : Math.ceil(r / o)))
            .replace(/_PAGES_/g, n.call(t, a ? 1 : Math.ceil(i / o)));
        }
        function jt(t) {
          var e,
            n,
            r,
            o = t.iInitDisplayStart,
            i = t.aoColumns,
            a = t.oFeatures,
            s = t.bDeferLoading;
          if (t.bInitialised) {
            for (
              dt(t),
                st(t),
                lt(t, t.aoHeader),
                lt(t, t.aoFooter),
                Wt(t, !0),
                a.bAutoWidth && Xt(t),
                e = 0,
                n = i.length;
              e < n;
              e++
            )
              (r = i[e]).sWidth && (r.nTh.style.width = Yt(r.sWidth));
            he(t, null, "preInit", [t]), ut(t);
            var l = ve(t);
            ("ssp" != l || s) &&
              ("ajax" == l
                ? ht(t, [], function (n) {
                    var r = bt(t, n);
                    for (e = 0; e < r.length; e++) U(t, r[e]);
                    (t.iInitDisplayStart = o), ut(t), Wt(t, !1), Et(t, n);
                  })
                : (Wt(t, !1), Et(t)));
          } else
            setTimeout(function () {
              jt(t);
            }, 200);
        }
        function Et(t, e) {
          (t._bInitComplete = !0),
            (e || t.oInit.aaData) && O(t),
            he(t, null, "plugin-init", [t, e]),
            he(t, "aoInitComplete", "init", [t, e]);
        }
        function Pt(t, e) {
          var n = parseInt(e, 10);
          (t._iDisplayLength = n), me(t), he(t, null, "length", [t, n]);
        }
        function Bt(t) {
          for (
            var e = t.oClasses,
              n = t.sTableId,
              o = t.aLengthMenu,
              i = Array.isArray(o[0]),
              a = i ? o[0] : o,
              s = i ? o[1] : o,
              l = r("<select/>", {
                name: n + "_length",
                "aria-controls": n,
                class: e.sLengthSelect,
              }),
              c = 0,
              u = a.length;
            c < u;
            c++
          )
            l[0][c] = new Option(
              "number" == typeof s[c] ? t.fnFormatNumber(s[c]) : s[c],
              a[c]
            );
          var d = r("<div><label/></div>").addClass(e.sLength);
          return (
            t.aanFeatures.l || (d[0].id = n + "_length"),
            d
              .children()
              .append(
                t.oLanguage.sLengthMenu.replace("_MENU_", l[0].outerHTML)
              ),
            r("select", d)
              .val(t._iDisplayLength)
              .on("change.DT", function (e) {
                Pt(t, r(this).val()), ct(t);
              }),
            r(t.nTable).on("length.dt.DT", function (e, n, o) {
              t === n && r("select", d).val(o);
            }),
            d[0]
          );
        }
        function Ot(t) {
          var e = t.sPaginationType,
            n = l.ext.pager[e],
            o = "function" == typeof n,
            i = function (t) {
              ct(t);
            },
            a = r("<div/>").addClass(t.oClasses.sPaging + e)[0],
            s = t.aanFeatures;
          return (
            o || n.fnInit(t, a, i),
            s.p ||
              ((a.id = t.sTableId + "_paginate"),
              t.aoDrawCallback.push({
                fn: function (t) {
                  if (o) {
                    var e,
                      r,
                      a = t._iDisplayStart,
                      l = t._iDisplayLength,
                      c = t.fnRecordsDisplay(),
                      u = -1 === l,
                      d = u ? 0 : Math.ceil(a / l),
                      f = u ? 1 : Math.ceil(c / l),
                      p = n(d, f);
                    for (e = 0, r = s.p.length; e < r; e++)
                      ge(t, "pageButton")(t, s.p[e], e, p, d, f);
                  } else n.fnUpdate(t, i);
                },
                sName: "pagination",
              })),
            a
          );
        }
        function Rt(t, e, n) {
          var r = t._iDisplayStart,
            o = t._iDisplayLength,
            i = t.fnRecordsDisplay();
          0 === i || -1 === o
            ? (r = 0)
            : "number" == typeof e
            ? (r = e * o) > i && (r = 0)
            : "first" == e
            ? (r = 0)
            : "previous" == e
            ? (r = o >= 0 ? r - o : 0) < 0 && (r = 0)
            : "next" == e
            ? r + o < i && (r += o)
            : "last" == e
            ? (r = Math.floor((i - 1) / o) * o)
            : ce(t, 0, "Unknown paging action: " + e, 5);
          var a = t._iDisplayStart !== r;
          return (
            (t._iDisplayStart = r),
            a
              ? (he(t, null, "page", [t]), n && ct(t))
              : he(t, null, "page-nc", [t]),
            a
          );
        }
        function Mt(t) {
          return r("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            class: t.oClasses.sProcessing,
            role: "status",
          })
            .html(t.oLanguage.sProcessing)
            .append("<div><div></div><div></div><div></div><div></div></div>")
            .insertBefore(t.nTable)[0];
        }
        function Wt(t, e) {
          t.oFeatures.bProcessing &&
            r(t.aanFeatures.r).css("display", e ? "block" : "none"),
            he(t, null, "processing", [t, e]);
        }
        function qt(t) {
          var e = r(t.nTable),
            n = t.oScroll;
          if ("" === n.sX && "" === n.sY) return t.nTable;
          var o = n.sX,
            i = n.sY,
            a = t.oClasses,
            s = e.children("caption"),
            l = s.length ? s[0]._captionSide : null,
            c = r(e[0].cloneNode(!1)),
            u = r(e[0].cloneNode(!1)),
            d = e.children("tfoot"),
            f = "<div/>",
            p = function (t) {
              return t ? Yt(t) : null;
            };
          d.length || (d = null);
          var h = r(f, { class: a.sScrollWrapper })
            .append(
              r(f, { class: a.sScrollHead })
                .css({
                  overflow: "hidden",
                  position: "relative",
                  border: 0,
                  width: o ? p(o) : "100%",
                })
                .append(
                  r(f, { class: a.sScrollHeadInner })
                    .css({
                      "box-sizing": "content-box",
                      width: n.sXInner || "100%",
                    })
                    .append(
                      c
                        .removeAttr("id")
                        .css("margin-left", 0)
                        .append("top" === l ? s : null)
                        .append(e.children("thead"))
                    )
                )
            )
            .append(
              r(f, { class: a.sScrollBody })
                .css({ position: "relative", overflow: "auto", width: p(o) })
                .append(e)
            );
          d &&
            h.append(
              r(f, { class: a.sScrollFoot })
                .css({
                  overflow: "hidden",
                  border: 0,
                  width: o ? p(o) : "100%",
                })
                .append(
                  r(f, { class: a.sScrollFootInner }).append(
                    u
                      .removeAttr("id")
                      .css("margin-left", 0)
                      .append("bottom" === l ? s : null)
                      .append(e.children("tfoot"))
                  )
                )
            );
          var m = h.children(),
            g = m[0],
            v = m[1],
            b = d ? m[2] : null;
          return (
            o &&
              r(v).on("scroll.DT", function (t) {
                var e = this.scrollLeft;
                (g.scrollLeft = e), d && (b.scrollLeft = e);
              }),
            r(v).css("max-height", i),
            n.bCollapse || r(v).css("height", i),
            (t.nScrollHead = g),
            (t.nScrollBody = v),
            (t.nScrollFoot = b),
            t.aoDrawCallback.push({ fn: zt, sName: "scrolling" }),
            h[0]
          );
        }
        function zt(t) {
          var e,
            n,
            o,
            i,
            a,
            s,
            l,
            c,
            u,
            d = t.oScroll,
            f = d.sX,
            p = d.sXInner,
            h = d.sY,
            m = d.iBarWidth,
            g = r(t.nScrollHead),
            v = g[0].style,
            b = g.children("div"),
            y = b[0].style,
            w = b.children("table"),
            S = t.nScrollBody,
            C = r(S),
            _ = S.style,
            T = r(t.nScrollFoot).children("div"),
            D = T.children("table"),
            I = r(t.nTHead),
            A = r(t.nTable),
            F = A[0],
            k = F.style,
            N = t.nTFoot ? r(t.nTFoot) : null,
            L = t.oBrowser,
            H = L.bScrollOversize,
            j = (x(t.aoColumns, "nTh"), []),
            E = [],
            P = [],
            B = [],
            M = function (t) {
              var e = t.style;
              (e.paddingTop = "0"),
                (e.paddingBottom = "0"),
                (e.borderTopWidth = "0"),
                (e.borderBottomWidth = "0"),
                (e.height = 0);
            },
            W = S.scrollHeight > S.clientHeight;
          if (t.scrollBarVis !== W && void 0 !== t.scrollBarVis)
            return (t.scrollBarVis = W), void O(t);
          (t.scrollBarVis = W),
            A.children("thead, tfoot").remove(),
            N &&
              ((s = N.clone().prependTo(A)),
              (n = N.find("tr")),
              (i = s.find("tr")),
              s.find("[id]").removeAttr("id")),
            (a = I.clone().prependTo(A)),
            (e = I.find("tr")),
            (o = a.find("tr")),
            a.find("th, td").removeAttr("tabindex"),
            a.find("[id]").removeAttr("id"),
            f || ((_.width = "100%"), (g[0].style.width = "100%")),
            r.each(pt(t, a), function (e, n) {
              (l = R(t, e)), (n.style.width = t.aoColumns[l].sWidth);
            }),
            N &&
              $t(function (t) {
                t.style.width = "";
              }, i),
            (u = A.outerWidth()),
            "" === f
              ? ((k.width = "100%"),
                H &&
                  (A.find("tbody").height() > S.offsetHeight ||
                    "scroll" == C.css("overflow-y")) &&
                  (k.width = Yt(A.outerWidth() - m)),
                (u = A.outerWidth()))
              : "" !== p && ((k.width = Yt(p)), (u = A.outerWidth())),
            $t(M, o),
            $t(function (t) {
              var e = window.getComputedStyle
                ? window.getComputedStyle(t).width
                : Yt(r(t).width());
              P.push(t.innerHTML), j.push(e);
            }, o),
            $t(function (t, e) {
              t.style.width = j[e];
            }, e),
            r(o).css("height", 0),
            N &&
              ($t(M, i),
              $t(function (t) {
                B.push(t.innerHTML), E.push(Yt(r(t).css("width")));
              }, i),
              $t(function (t, e) {
                t.style.width = E[e];
              }, n),
              r(i).height(0)),
            $t(function (t, e) {
              (t.innerHTML =
                '<div class="dataTables_sizing">' + P[e] + "</div>"),
                (t.childNodes[0].style.height = "0"),
                (t.childNodes[0].style.overflow = "hidden"),
                (t.style.width = j[e]);
            }, o),
            N &&
              $t(function (t, e) {
                (t.innerHTML =
                  '<div class="dataTables_sizing">' + B[e] + "</div>"),
                  (t.childNodes[0].style.height = "0"),
                  (t.childNodes[0].style.overflow = "hidden"),
                  (t.style.width = E[e]);
              }, i),
            Math.round(A.outerWidth()) < Math.round(u)
              ? ((c =
                  S.scrollHeight > S.offsetHeight ||
                  "scroll" == C.css("overflow-y")
                    ? u + m
                    : u),
                H &&
                  (S.scrollHeight > S.offsetHeight ||
                    "scroll" == C.css("overflow-y")) &&
                  (k.width = Yt(c - m)),
                ("" !== f && "" === p) ||
                  ce(t, 1, "Possible column misalignment", 6))
              : (c = "100%"),
            (_.width = Yt(c)),
            (v.width = Yt(c)),
            N && (t.nScrollFoot.style.width = Yt(c)),
            h || (H && (_.height = Yt(F.offsetHeight + m)));
          var q = A.outerWidth();
          (w[0].style.width = Yt(q)), (y.width = Yt(q));
          var z =
              A.height() > S.clientHeight || "scroll" == C.css("overflow-y"),
            $ = "padding" + (L.bScrollbarLeft ? "Left" : "Right");
          (y[$] = z ? m + "px" : "0px"),
            N &&
              ((D[0].style.width = Yt(q)),
              (T[0].style.width = Yt(q)),
              (T[0].style[$] = z ? m + "px" : "0px")),
            A.children("colgroup").insertBefore(A.children("thead")),
            C.trigger("scroll"),
            (!t.bSorted && !t.bFiltered) || t._drawHold || (S.scrollTop = 0);
        }
        function $t(t, e, n) {
          for (var r, o, i = 0, a = 0, s = e.length; a < s; ) {
            for (r = e[a].firstChild, o = n ? n[a].firstChild : null; r; )
              1 === r.nodeType && (n ? t(r, o, i) : t(r, i), i++),
                (r = r.nextSibling),
                (o = n ? o.nextSibling : null);
            a++;
          }
        }
        var Ut = /<.*?>/g;
        function Xt(t) {
          var e,
            n,
            o,
            i = t.nTable,
            a = t.aoColumns,
            s = t.oScroll,
            l = s.sY,
            c = s.sX,
            u = s.sXInner,
            d = a.length,
            f = q(t, "bVisible"),
            p = r("th", t.nTHead),
            h = i.getAttribute("width"),
            m = i.parentNode,
            g = !1,
            v = t.oBrowser,
            b = v.bScrollOversize,
            y = i.style.width;
          for (y && -1 !== y.indexOf("%") && (h = y), e = 0; e < f.length; e++)
            null !== (n = a[f[e]]).sWidth &&
              ((n.sWidth = Jt(n.sWidthOrig, m)), (g = !0));
          if (b || (!g && !c && !l && d == W(t) && d == p.length))
            for (e = 0; e < d; e++) {
              var x = R(t, e);
              null !== x && (a[x].sWidth = Yt(p.eq(e).width()));
            }
          else {
            var w = r(i).clone().css("visibility", "hidden").removeAttr("id");
            w.find("tbody tr").remove();
            var S = r("<tr/>").appendTo(w.find("tbody"));
            for (
              w.find("thead, tfoot").remove(),
                w.append(r(t.nTHead).clone()).append(r(t.nTFoot).clone()),
                w.find("tfoot th, tfoot td").css("width", ""),
                p = pt(t, w.find("thead")[0]),
                e = 0;
              e < f.length;
              e++
            )
              (n = a[f[e]]),
                (p[e].style.width =
                  null !== n.sWidthOrig && "" !== n.sWidthOrig
                    ? Yt(n.sWidthOrig)
                    : ""),
                n.sWidthOrig &&
                  c &&
                  r(p[e]).append(
                    r("<div/>").css({
                      width: n.sWidthOrig,
                      margin: 0,
                      padding: 0,
                      border: 0,
                      height: 1,
                    })
                  );
            if (t.aoData.length)
              for (e = 0; e < f.length; e++)
                (n = a[(o = f[e])]),
                  r(Kt(t, o)).clone(!1).append(n.sContentPadding).appendTo(S);
            r("[name]", w).removeAttr("name");
            var C = r("<div/>")
              .css(
                c || l
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: 1,
                      right: 0,
                      overflow: "hidden",
                    }
                  : {}
              )
              .append(w)
              .appendTo(m);
            c && u
              ? w.width(u)
              : c
              ? (w.css("width", "auto"),
                w.removeAttr("width"),
                w.width() < m.clientWidth && h && w.width(m.clientWidth))
              : l
              ? w.width(m.clientWidth)
              : h && w.width(h);
            var _ = 0;
            for (e = 0; e < f.length; e++) {
              var T = r(p[e]),
                D = T.outerWidth() - T.width(),
                I = v.bBounding
                  ? Math.ceil(p[e].getBoundingClientRect().width)
                  : T.outerWidth();
              (_ += I), (a[f[e]].sWidth = Yt(I - D));
            }
            (i.style.width = Yt(_)), C.remove();
          }
          if ((h && (i.style.width = Yt(h)), (h || c) && !t._reszEvt)) {
            var A = function () {
              r(window).on(
                "resize.DT-" + t.sInstance,
                Vt(function () {
                  O(t);
                })
              );
            };
            b ? setTimeout(A, 1e3) : A(), (t._reszEvt = !0);
          }
        }
        var Vt = l.util.throttle;
        function Jt(t, e) {
          if (!t) return 0;
          var n = r("<div/>")
              .css("width", Yt(t))
              .appendTo(e || document.body),
            o = n[0].offsetWidth;
          return n.remove(), o;
        }
        function Kt(t, e) {
          var n = Gt(t, e);
          if (n < 0) return null;
          var o = t.aoData[n];
          return o.nTr
            ? o.anCells[e]
            : r("<td/>").html(V(t, n, e, "display"))[0];
        }
        function Gt(t, e) {
          for (var n, r = -1, o = -1, i = 0, a = t.aoData.length; i < a; i++)
            (n = (n = (n = V(t, i, e, "display") + "").replace(Ut, "")).replace(
              /&nbsp;/g,
              " "
            )).length > r && ((r = n.length), (o = i));
          return o;
        }
        function Yt(t) {
          return null === t
            ? "0px"
            : "number" == typeof t
            ? t < 0
              ? "0px"
              : t + "px"
            : t.match(/\d$/)
            ? t + "px"
            : t;
        }
        function Zt(t) {
          var e,
            n,
            o,
            i,
            a,
            s,
            c,
            u = [],
            d = t.aoColumns,
            f = t.aaSortingFixed,
            p = r.isPlainObject(f),
            h = [],
            m = function (t) {
              t.length && !Array.isArray(t[0]) ? h.push(t) : r.merge(h, t);
            };
          for (
            Array.isArray(f) && m(f),
              p && f.pre && m(f.pre),
              m(t.aaSorting),
              p && f.post && m(f.post),
              e = 0;
            e < h.length;
            e++
          )
            for (n = 0, o = (i = d[(c = h[e][0])].aDataSort).length; n < o; n++)
              (s = d[(a = i[n])].sType || "string"),
                void 0 === h[e]._idx &&
                  (h[e]._idx = r.inArray(h[e][1], d[a].asSorting)),
                u.push({
                  src: c,
                  col: a,
                  dir: h[e][1],
                  index: h[e]._idx,
                  type: s,
                  formatter: l.ext.type.order[s + "-pre"],
                });
          return u;
        }
        function Qt(t) {
          var e,
            n,
            r,
            o,
            i,
            a = [],
            s = l.ext.type.order,
            c = t.aoData,
            u = (t.aoColumns, 0),
            d = t.aiDisplayMaster;
          for (z(t), e = 0, n = (i = Zt(t)).length; e < n; e++)
            (o = i[e]).formatter && u++, oe(t, o.col);
          if ("ssp" != ve(t) && 0 !== i.length) {
            for (e = 0, r = d.length; e < r; e++) a[d[e]] = e;
            u === i.length
              ? d.sort(function (t, e) {
                  var n,
                    r,
                    o,
                    s,
                    l,
                    u = i.length,
                    d = c[t]._aSortData,
                    f = c[e]._aSortData;
                  for (o = 0; o < u; o++)
                    if (
                      0 !==
                      (s =
                        (n = d[(l = i[o]).col]) < (r = f[l.col])
                          ? -1
                          : n > r
                          ? 1
                          : 0)
                    )
                      return "asc" === l.dir ? s : -s;
                  return (n = a[t]) < (r = a[e]) ? -1 : n > r ? 1 : 0;
                })
              : d.sort(function (t, e) {
                  var n,
                    r,
                    o,
                    l,
                    u,
                    d = i.length,
                    f = c[t]._aSortData,
                    p = c[e]._aSortData;
                  for (o = 0; o < d; o++)
                    if (
                      ((n = f[(u = i[o]).col]),
                      (r = p[u.col]),
                      0 !==
                        (l = (s[u.type + "-" + u.dir] || s["string-" + u.dir])(
                          n,
                          r
                        )))
                    )
                      return l;
                  return (n = a[t]) < (r = a[e]) ? -1 : n > r ? 1 : 0;
                });
          }
          t.bSorted = !0;
        }
        function te(t) {
          for (
            var e,
              n,
              r = t.aoColumns,
              o = Zt(t),
              i = t.oLanguage.oAria,
              a = 0,
              s = r.length;
            a < s;
            a++
          ) {
            var l = r[a],
              c = l.asSorting,
              u = l.ariaTitle || l.sTitle.replace(/<.*?>/g, ""),
              d = l.nTh;
            d.removeAttribute("aria-sort"),
              l.bSortable
                ? (o.length > 0 && o[0].col == a
                    ? (d.setAttribute(
                        "aria-sort",
                        "asc" == o[0].dir ? "ascending" : "descending"
                      ),
                      (n = c[o[0].index + 1] || c[0]))
                    : (n = c[0]),
                  (e =
                    u + ("asc" === n ? i.sSortAscending : i.sSortDescending)))
                : (e = u),
              d.setAttribute("aria-label", e);
          }
        }
        function ee(t, e, n, o) {
          var i,
            a = t.aoColumns[e],
            s = t.aaSorting,
            l = a.asSorting,
            c = function (t, e) {
              var n = t._idx;
              return (
                void 0 === n && (n = r.inArray(t[1], l)),
                n + 1 < l.length ? n + 1 : e ? null : 0
              );
            };
          if (
            ("number" == typeof s[0] && (s = t.aaSorting = [s]),
            n && t.oFeatures.bSortMulti)
          ) {
            var u = r.inArray(e, x(s, "0"));
            -1 !== u
              ? (null === (i = c(s[u], !0)) && 1 === s.length && (i = 0),
                null === i
                  ? s.splice(u, 1)
                  : ((s[u][1] = l[i]), (s[u]._idx = i)))
              : (s.push([e, l[0], 0]), (s[s.length - 1]._idx = 0));
          } else
            s.length && s[0][0] == e
              ? ((i = c(s[0])),
                (s.length = 1),
                (s[0][1] = l[i]),
                (s[0]._idx = i))
              : ((s.length = 0), s.push([e, l[0]]), (s[0]._idx = 0));
          ut(t), "function" == typeof o && o(t);
        }
        function ne(t, e, n, r) {
          var o = t.aoColumns[n];
          fe(e, {}, function (e) {
            !1 !== o.bSortable &&
              (t.oFeatures.bProcessing
                ? (Wt(t, !0),
                  setTimeout(function () {
                    ee(t, n, e.shiftKey, r), "ssp" !== ve(t) && Wt(t, !1);
                  }, 0))
                : ee(t, n, e.shiftKey, r));
          });
        }
        function re(t) {
          var e,
            n,
            o,
            i = t.aLastSort,
            a = t.oClasses.sSortColumn,
            s = Zt(t),
            l = t.oFeatures;
          if (l.bSort && l.bSortClasses) {
            for (e = 0, n = i.length; e < n; e++)
              (o = i[e].src),
                r(x(t.aoData, "anCells", o)).removeClass(
                  a + (e < 2 ? e + 1 : 3)
                );
            for (e = 0, n = s.length; e < n; e++)
              (o = s[e].src),
                r(x(t.aoData, "anCells", o)).addClass(a + (e < 2 ? e + 1 : 3));
          }
          t.aLastSort = s;
        }
        function oe(t, e) {
          var n,
            r,
            o,
            i = t.aoColumns[e],
            a = l.ext.order[i.sSortDataType];
          a && (n = a.call(t.oInstance, t, e, M(t, e)));
          for (
            var s = l.ext.type.order[i.sType + "-pre"],
              c = 0,
              u = t.aoData.length;
            c < u;
            c++
          )
            (r = t.aoData[c])._aSortData || (r._aSortData = []),
              (r._aSortData[e] && !a) ||
                ((o = a ? n[c] : V(t, c, e, "sort")),
                (r._aSortData[e] = s ? s(o) : o));
        }
        function ie(t) {
          if (!t._bLoadingState) {
            var e = {
              time: +new Date(),
              start: t._iDisplayStart,
              length: t._iDisplayLength,
              order: r.extend(!0, [], t.aaSorting),
              search: Ft(t.oPreviousSearch),
              columns: r.map(t.aoColumns, function (e, n) {
                return {
                  visible: e.bVisible,
                  search: Ft(t.aoPreSearchCols[n]),
                };
              }),
            };
            (t.oSavedState = e),
              he(t, "aoStateSaveParams", "stateSaveParams", [t, e]),
              t.oFeatures.bStateSave &&
                !t.bDestroying &&
                t.fnStateSaveCallback.call(t.oInstance, t, e);
          }
        }
        function ae(t, e, n) {
          if (t.oFeatures.bStateSave) {
            var r = t.fnStateLoadCallback.call(t.oInstance, t, function (e) {
              se(t, e, n);
            });
            return void 0 !== r && se(t, r, n), !0;
          }
          n();
        }
        function se(t, e, n) {
          var o,
            i,
            a = t.aoColumns;
          t._bLoadingState = !0;
          var s = t._bInitComplete ? new l.Api(t) : null;
          if (!e || !e.time) return (t._bLoadingState = !1), void n();
          var c = he(t, "aoStateLoadParams", "stateLoadParams", [t, e]);
          if (-1 !== r.inArray(!1, c)) return (t._bLoadingState = !1), void n();
          var u = t.iStateDuration;
          if (u > 0 && e.time < +new Date() - 1e3 * u)
            return (t._bLoadingState = !1), void n();
          if (e.columns && a.length !== e.columns.length)
            return (t._bLoadingState = !1), void n();
          if (
            ((t.oLoadedState = r.extend(!0, {}, e)),
            void 0 !== e.length &&
              (s ? s.page.len(e.length) : (t._iDisplayLength = e.length)),
            void 0 !== e.start &&
              (null === s
                ? ((t._iDisplayStart = e.start),
                  (t.iInitDisplayStart = e.start))
                : Rt(t, e.start / t._iDisplayLength)),
            void 0 !== e.order &&
              ((t.aaSorting = []),
              r.each(e.order, function (e, n) {
                t.aaSorting.push(n[0] >= a.length ? [0, n[1]] : n);
              })),
            void 0 !== e.search && r.extend(t.oPreviousSearch, kt(e.search)),
            e.columns)
          ) {
            for (o = 0, i = e.columns.length; o < i; o++) {
              var d = e.columns[o];
              void 0 !== d.visible &&
                (s
                  ? s.column(o).visible(d.visible, !1)
                  : (a[o].bVisible = d.visible)),
                void 0 !== d.search &&
                  r.extend(t.aoPreSearchCols[o], kt(d.search));
            }
            s && s.columns.adjust();
          }
          (t._bLoadingState = !1),
            he(t, "aoStateLoaded", "stateLoaded", [t, e]),
            n();
        }
        function le(t) {
          var e = l.settings,
            n = r.inArray(t, x(e, "nTable"));
          return -1 !== n ? e[n] : null;
        }
        function ce(t, e, n, r) {
          if (
            ((n =
              "DataTables warning: " +
              (t ? "table id=" + t.sTableId + " - " : "") +
              n),
            r &&
              (n +=
                ". For more information about this error, please see http://datatables.net/tn/" +
                r),
            e)
          )
            window.console && console.log && console.log(n);
          else {
            var o = l.ext,
              i = o.sErrMode || o.errMode;
            if ((t && he(t, null, "error", [t, r, n]), "alert" == i)) alert(n);
            else {
              if ("throw" == i) throw new Error(n);
              "function" == typeof i && i(t, r, n);
            }
          }
        }
        function ue(t, e, n, o) {
          Array.isArray(n)
            ? r.each(n, function (n, r) {
                Array.isArray(r) ? ue(t, e, r[0], r[1]) : ue(t, e, r);
              })
            : (void 0 === o && (o = n), void 0 !== e[n] && (t[o] = e[n]));
        }
        function de(t, e, n) {
          var o;
          for (var i in e)
            e.hasOwnProperty(i) &&
              ((o = e[i]),
              r.isPlainObject(o)
                ? (r.isPlainObject(t[i]) || (t[i] = {}), r.extend(!0, t[i], o))
                : n && "data" !== i && "aaData" !== i && Array.isArray(o)
                ? (t[i] = o.slice())
                : (t[i] = o));
          return t;
        }
        function fe(t, e, n) {
          r(t)
            .on("click.DT", e, function (e) {
              r(t).trigger("blur"), n(e);
            })
            .on("keypress.DT", e, function (t) {
              13 === t.which && (t.preventDefault(), n(t));
            })
            .on("selectstart.DT", function () {
              return !1;
            });
        }
        function pe(t, e, n, r) {
          n && t[e].push({ fn: n, sName: r });
        }
        function he(t, e, n, o) {
          var i = [];
          if (
            (e &&
              (i = r.map(t[e].slice().reverse(), function (e, n) {
                return e.fn.apply(t.oInstance, o);
              })),
            null !== n)
          ) {
            var a = r.Event(n + ".dt"),
              s = r(t.nTable);
            s.trigger(a, o),
              0 === s.parents("body").length && r("body").trigger(a, o),
              i.push(a.result);
          }
          return i;
        }
        function me(t) {
          var e = t._iDisplayStart,
            n = t.fnDisplayEnd(),
            r = t._iDisplayLength;
          e >= n && (e = n - r),
            (e -= e % r),
            (-1 === r || e < 0) && (e = 0),
            (t._iDisplayStart = e);
        }
        function ge(t, e) {
          var n = t.renderer,
            o = l.ext.renderer[e];
          return r.isPlainObject(n) && n[e]
            ? o[n[e]] || o._
            : ("string" == typeof n && o[n]) || o._;
        }
        function ve(t) {
          return t.oFeatures.bServerSide
            ? "ssp"
            : t.ajax || t.sAjaxSource
            ? "ajax"
            : "dom";
        }
        var be = [],
          ye = Array.prototype;
        (i = function (t, e) {
          if (!(this instanceof i)) return new i(t, e);
          var n = [],
            o = function (t) {
              var e = (function (t) {
                var e,
                  n,
                  o = l.settings,
                  i = r.map(o, function (t, e) {
                    return t.nTable;
                  });
                return t
                  ? t.nTable && t.oApi
                    ? [t]
                    : t.nodeName && "table" === t.nodeName.toLowerCase()
                    ? -1 !== (e = r.inArray(t, i))
                      ? [o[e]]
                      : null
                    : t && "function" == typeof t.settings
                    ? t.settings().toArray()
                    : ("string" == typeof t
                        ? (n = r(t))
                        : t instanceof r && (n = t),
                      n
                        ? n
                            .map(function (t) {
                              return -1 !== (e = r.inArray(this, i))
                                ? o[e]
                                : null;
                            })
                            .toArray()
                        : void 0)
                  : [];
              })(t);
              e && n.push.apply(n, e);
            };
          if (Array.isArray(t))
            for (var a = 0, s = t.length; a < s; a++) o(t[a]);
          else o(t);
          (this.context = T(n)),
            e && r.merge(this, e),
            (this.selector = { rows: null, cols: null, opts: null }),
            i.extend(this, this, be);
        }),
          (l.Api = i),
          r.extend(i.prototype, {
            any: function () {
              return 0 !== this.count();
            },
            concat: ye.concat,
            context: [],
            count: function () {
              return this.flatten().length;
            },
            each: function (t) {
              for (var e = 0, n = this.length; e < n; e++)
                t.call(this, this[e], e, this);
              return this;
            },
            eq: function (t) {
              var e = this.context;
              return e.length > t ? new i(e[t], this[t]) : null;
            },
            filter: function (t) {
              var e = [];
              if (ye.filter) e = ye.filter.call(this, t, this);
              else
                for (var n = 0, r = this.length; n < r; n++)
                  t.call(this, this[n], n, this) && e.push(this[n]);
              return new i(this.context, e);
            },
            flatten: function () {
              var t = [];
              return new i(this.context, t.concat.apply(t, this.toArray()));
            },
            join: ye.join,
            indexOf:
              ye.indexOf ||
              function (t, e) {
                for (var n = e || 0, r = this.length; n < r; n++)
                  if (this[n] === t) return n;
                return -1;
              },
            iterator: function (t, e, n, r) {
              var o,
                a,
                s,
                l,
                c,
                u,
                d,
                f,
                p = [],
                h = this.context,
                m = this.selector;
              for (
                "string" == typeof t && ((r = n), (n = e), (e = t), (t = !1)),
                  a = 0,
                  s = h.length;
                a < s;
                a++
              ) {
                var g = new i(h[a]);
                if ("table" === e)
                  void 0 !== (o = n.call(g, h[a], a)) && p.push(o);
                else if ("columns" === e || "rows" === e)
                  void 0 !== (o = n.call(g, h[a], this[a], a)) && p.push(o);
                else if (
                  "column" === e ||
                  "column-rows" === e ||
                  "row" === e ||
                  "cell" === e
                )
                  for (
                    d = this[a],
                      "column-rows" === e && (u = Te(h[a], m.opts)),
                      l = 0,
                      c = d.length;
                    l < c;
                    l++
                  )
                    (f = d[l]),
                      void 0 !==
                        (o =
                          "cell" === e
                            ? n.call(g, h[a], f.row, f.column, a, l)
                            : n.call(g, h[a], f, a, l, u)) && p.push(o);
              }
              if (p.length || r) {
                var v = new i(h, t ? p.concat.apply([], p) : p),
                  b = v.selector;
                return (
                  (b.rows = m.rows), (b.cols = m.cols), (b.opts = m.opts), v
                );
              }
              return this;
            },
            lastIndexOf:
              ye.lastIndexOf ||
              function (t, e) {
                return this.indexOf.apply(this.toArray.reverse(), arguments);
              },
            length: 0,
            map: function (t) {
              var e = [];
              if (ye.map) e = ye.map.call(this, t, this);
              else
                for (var n = 0, r = this.length; n < r; n++)
                  e.push(t.call(this, this[n], n));
              return new i(this.context, e);
            },
            pluck: function (t) {
              var e = l.util.get(t);
              return this.map(function (t) {
                return e(t);
              });
            },
            pop: ye.pop,
            push: ye.push,
            reduce:
              ye.reduce ||
              function (t, e) {
                return E(this, t, e, 0, this.length, 1);
              },
            reduceRight:
              ye.reduceRight ||
              function (t, e) {
                return E(this, t, e, this.length - 1, -1, -1);
              },
            reverse: ye.reverse,
            selector: null,
            shift: ye.shift,
            slice: function () {
              return new i(this.context, this);
            },
            sort: ye.sort,
            splice: ye.splice,
            toArray: function () {
              return ye.slice.call(this);
            },
            to$: function () {
              return r(this);
            },
            toJQuery: function () {
              return r(this);
            },
            unique: function () {
              return new i(this.context, T(this));
            },
            unshift: ye.unshift,
          }),
          (i.extend = function (t, e, n) {
            if (n.length && e && (e instanceof i || e.__dt_wrapper)) {
              var r,
                o,
                a,
                s = function (t, e, n) {
                  return function () {
                    var r = e.apply(t, arguments);
                    return i.extend(r, r, n.methodExt), r;
                  };
                };
              for (r = 0, o = n.length; r < o; r++)
                (e[(a = n[r]).name] =
                  "function" === a.type
                    ? s(t, a.val, a)
                    : "object" === a.type
                    ? {}
                    : a.val),
                  (e[a.name].__dt_wrapper = !0),
                  i.extend(t, e[a.name], a.propExt);
            }
          }),
          (i.register = a =
            function (t, e) {
              if (Array.isArray(t))
                for (var n = 0, o = t.length; n < o; n++) i.register(t[n], e);
              else {
                var a,
                  s,
                  l,
                  c,
                  u = t.split("."),
                  d = be,
                  f = function (t, e) {
                    for (var n = 0, r = t.length; n < r; n++)
                      if (t[n].name === e) return t[n];
                    return null;
                  };
                for (a = 0, s = u.length; a < s; a++) {
                  var p = f(
                    d,
                    (l = (c = -1 !== u[a].indexOf("()"))
                      ? u[a].replace("()", "")
                      : u[a])
                  );
                  p ||
                    ((p = {
                      name: l,
                      val: {},
                      methodExt: [],
                      propExt: [],
                      type: "object",
                    }),
                    d.push(p)),
                    a === s - 1
                      ? ((p.val = e),
                        (p.type =
                          "function" == typeof e
                            ? "function"
                            : r.isPlainObject(e)
                            ? "object"
                            : "other"))
                      : (d = c ? p.methodExt : p.propExt);
                }
              }
            }),
          (i.registerPlural = s =
            function (t, e, n) {
              i.register(t, n),
                i.register(e, function () {
                  var t = n.apply(this, arguments);
                  return t === this
                    ? this
                    : t instanceof i
                    ? t.length
                      ? Array.isArray(t[0])
                        ? new i(t.context, t[0])
                        : t[0]
                      : void 0
                    : t;
                });
            });
        var xe = function (t, e) {
          if (Array.isArray(t))
            return r.map(t, function (t) {
              return xe(t, e);
            });
          if ("number" == typeof t) return [e[t]];
          var n = r.map(e, function (t, e) {
            return t.nTable;
          });
          return r(n)
            .filter(t)
            .map(function (t) {
              var o = r.inArray(this, n);
              return e[o];
            })
            .toArray();
        };
        a("tables()", function (t) {
          return null != t ? new i(xe(t, this.context)) : this;
        }),
          a("table()", function (t) {
            var e = this.tables(t),
              n = e.context;
            return n.length ? new i(n[0]) : e;
          }),
          s("tables().nodes()", "table().node()", function () {
            return this.iterator(
              "table",
              function (t) {
                return t.nTable;
              },
              1
            );
          }),
          s("tables().body()", "table().body()", function () {
            return this.iterator(
              "table",
              function (t) {
                return t.nTBody;
              },
              1
            );
          }),
          s("tables().header()", "table().header()", function () {
            return this.iterator(
              "table",
              function (t) {
                return t.nTHead;
              },
              1
            );
          }),
          s("tables().footer()", "table().footer()", function () {
            return this.iterator(
              "table",
              function (t) {
                return t.nTFoot;
              },
              1
            );
          }),
          s("tables().containers()", "table().container()", function () {
            return this.iterator(
              "table",
              function (t) {
                return t.nTableWrapper;
              },
              1
            );
          }),
          a("draw()", function (t) {
            return this.iterator("table", function (e) {
              "page" === t
                ? ct(e)
                : ("string" == typeof t && (t = "full-hold" !== t),
                  ut(e, !1 === t));
            });
          }),
          a("page()", function (t) {
            return void 0 === t
              ? this.page.info().page
              : this.iterator("table", function (e) {
                  Rt(e, t);
                });
          }),
          a("page.info()", function (t) {
            if (0 !== this.context.length) {
              var e = this.context[0],
                n = e._iDisplayStart,
                r = e.oFeatures.bPaginate ? e._iDisplayLength : -1,
                o = e.fnRecordsDisplay(),
                i = -1 === r;
              return {
                page: i ? 0 : Math.floor(n / r),
                pages: i ? 1 : Math.ceil(o / r),
                start: n,
                end: e.fnDisplayEnd(),
                length: r,
                recordsTotal: e.fnRecordsTotal(),
                recordsDisplay: o,
                serverSide: "ssp" === ve(e),
              };
            }
          }),
          a("page.len()", function (t) {
            return void 0 === t
              ? 0 !== this.context.length
                ? this.context[0]._iDisplayLength
                : void 0
              : this.iterator("table", function (e) {
                  Pt(e, t);
                });
          });
        var we = function (t, e, n) {
          if (n) {
            var r = new i(t);
            r.one("draw", function () {
              n(r.ajax.json());
            });
          }
          if ("ssp" == ve(t)) ut(t, e);
          else {
            Wt(t, !0);
            var o = t.jqXHR;
            o && 4 !== o.readyState && o.abort(),
              ht(t, [], function (n) {
                et(t);
                for (var r = bt(t, n), o = 0, i = r.length; o < i; o++)
                  U(t, r[o]);
                ut(t, e), Wt(t, !1);
              });
          }
        };
        a("ajax.json()", function () {
          var t = this.context;
          if (t.length > 0) return t[0].json;
        }),
          a("ajax.params()", function () {
            var t = this.context;
            if (t.length > 0) return t[0].oAjaxData;
          }),
          a("ajax.reload()", function (t, e) {
            return this.iterator("table", function (n) {
              we(n, !1 === e, t);
            });
          }),
          a("ajax.url()", function (t) {
            var e = this.context;
            if (void 0 === t) {
              if (0 === e.length) return;
              return (e = e[0]).ajax
                ? r.isPlainObject(e.ajax)
                  ? e.ajax.url
                  : e.ajax
                : e.sAjaxSource;
            }
            return this.iterator("table", function (e) {
              r.isPlainObject(e.ajax) ? (e.ajax.url = t) : (e.ajax = t);
            });
          }),
          a("ajax.url().load()", function (t, e) {
            return this.iterator("table", function (n) {
              we(n, !1 === e, t);
            });
          });
        var Se = function (t, e, n, r, i) {
            var a,
              s,
              l,
              c,
              u,
              d,
              f = [],
              p = typeof e;
            for (
              (e &&
                "string" !== p &&
                "function" !== p &&
                void 0 !== e.length) ||
                (e = [e]),
                l = 0,
                c = e.length;
              l < c;
              l++
            )
              for (
                u = 0,
                  d = (s =
                    e[l] && e[l].split && !e[l].match(/[\[\(:]/)
                      ? e[l].split(",")
                      : [e[l]]).length;
                u < d;
                u++
              )
                (a = n("string" == typeof s[u] ? s[u].trim() : s[u])) &&
                  a.length &&
                  (f = f.concat(a));
            var h = o.selector[t];
            if (h.length)
              for (l = 0, c = h.length; l < c; l++) f = h[l](r, i, f);
            return T(f);
          },
          Ce = function (t) {
            return (
              t || (t = {}),
              t.filter && void 0 === t.search && (t.search = t.filter),
              r.extend({ search: "none", order: "current", page: "all" }, t)
            );
          },
          _e = function (t) {
            for (var e = 0, n = t.length; e < n; e++)
              if (t[e].length > 0)
                return (
                  (t[0] = t[e]),
                  (t[0].length = 1),
                  (t.length = 1),
                  (t.context = [t.context[e]]),
                  t
                );
            return (t.length = 0), t;
          },
          Te = function (t, e) {
            var n,
              o = [],
              i = t.aiDisplay,
              a = t.aiDisplayMaster,
              s = e.search,
              l = e.order,
              c = e.page;
            if ("ssp" == ve(t)) return "removed" === s ? [] : S(0, a.length);
            if ("current" == c)
              for (d = t._iDisplayStart, f = t.fnDisplayEnd(); d < f; d++)
                o.push(i[d]);
            else if ("current" == l || "applied" == l) {
              if ("none" == s) o = a.slice();
              else if ("applied" == s) o = i.slice();
              else if ("removed" == s) {
                for (var u = {}, d = 0, f = i.length; d < f; d++)
                  u[i[d]] = null;
                o = r.map(a, function (t) {
                  return u.hasOwnProperty(t) ? null : t;
                });
              }
            } else if ("index" == l || "original" == l)
              for (d = 0, f = t.aoData.length; d < f; d++)
                ("none" == s ||
                  (-1 === (n = r.inArray(d, i)) && "removed" == s) ||
                  (n >= 0 && "applied" == s)) &&
                  o.push(d);
            return o;
          };
        a("rows()", function (t, e) {
          void 0 === t ? (t = "") : r.isPlainObject(t) && ((e = t), (t = "")),
            (e = Ce(e));
          var n = this.iterator(
            "table",
            function (n) {
              return (function (t, e, n) {
                var o;
                return Se(
                  "row",
                  e,
                  function (e) {
                    var i = g(e),
                      a = t.aoData;
                    if (null !== i && !n) return [i];
                    if (
                      (o || (o = Te(t, n)),
                      null !== i && -1 !== r.inArray(i, o))
                    )
                      return [i];
                    if (null == e || "" === e) return o;
                    if ("function" == typeof e)
                      return r.map(o, function (t) {
                        var n = a[t];
                        return e(t, n._aData, n.nTr) ? t : null;
                      });
                    if (e.nodeName) {
                      var s = e._DT_RowIndex,
                        l = e._DT_CellIndex;
                      if (void 0 !== s)
                        return a[s] && a[s].nTr === e ? [s] : [];
                      if (l)
                        return a[l.row] && a[l.row].nTr === e.parentNode
                          ? [l.row]
                          : [];
                      var c = r(e).closest("*[data-dt-row]");
                      return c.length ? [c.data("dt-row")] : [];
                    }
                    if ("string" == typeof e && "#" === e.charAt(0)) {
                      var u = t.aIds[e.replace(/^#/, "")];
                      if (void 0 !== u) return [u.idx];
                    }
                    var d = C(w(t.aoData, o, "nTr"));
                    return r(d)
                      .filter(e)
                      .map(function () {
                        return this._DT_RowIndex;
                      })
                      .toArray();
                  },
                  t,
                  n
                );
              })(n, t, e);
            },
            1
          );
          return (n.selector.rows = t), (n.selector.opts = e), n;
        }),
          a("rows().nodes()", function () {
            return this.iterator(
              "row",
              function (t, e) {
                return t.aoData[e].nTr || void 0;
              },
              1
            );
          }),
          a("rows().data()", function () {
            return this.iterator(
              !0,
              "rows",
              function (t, e) {
                return w(t.aoData, e, "_aData");
              },
              1
            );
          }),
          s("rows().cache()", "row().cache()", function (t) {
            return this.iterator(
              "row",
              function (e, n) {
                var r = e.aoData[n];
                return "search" === t ? r._aFilterData : r._aSortData;
              },
              1
            );
          }),
          s("rows().invalidate()", "row().invalidate()", function (t) {
            return this.iterator("row", function (e, n) {
              rt(e, n, t);
            });
          }),
          s("rows().indexes()", "row().index()", function () {
            return this.iterator(
              "row",
              function (t, e) {
                return e;
              },
              1
            );
          }),
          s("rows().ids()", "row().id()", function (t) {
            for (var e = [], n = this.context, r = 0, o = n.length; r < o; r++)
              for (var a = 0, s = this[r].length; a < s; a++) {
                var l = n[r].rowIdFn(n[r].aoData[this[r][a]]._aData);
                e.push((!0 === t ? "#" : "") + l);
              }
            return new i(n, e);
          }),
          s("rows().remove()", "row().remove()", function () {
            var t = this;
            return (
              this.iterator("row", function (e, n, r) {
                var o,
                  i,
                  a,
                  s,
                  l,
                  c,
                  u = e.aoData,
                  d = u[n];
                for (u.splice(n, 1), o = 0, i = u.length; o < i; o++)
                  if (
                    ((c = (l = u[o]).anCells),
                    null !== l.nTr && (l.nTr._DT_RowIndex = o),
                    null !== c)
                  )
                    for (a = 0, s = c.length; a < s; a++)
                      c[a]._DT_CellIndex.row = o;
                nt(e.aiDisplayMaster, n),
                  nt(e.aiDisplay, n),
                  nt(t[r], n, !1),
                  e._iRecordsDisplay > 0 && e._iRecordsDisplay--,
                  me(e);
                var f = e.rowIdFn(d._aData);
                void 0 !== f && delete e.aIds[f];
              }),
              this.iterator("table", function (t) {
                for (var e = 0, n = t.aoData.length; e < n; e++)
                  t.aoData[e].idx = e;
              }),
              this
            );
          }),
          a("rows.add()", function (t) {
            var e = this.iterator(
                "table",
                function (e) {
                  var n,
                    r,
                    o,
                    i = [];
                  for (r = 0, o = t.length; r < o; r++)
                    (n = t[r]).nodeName && "TR" === n.nodeName.toUpperCase()
                      ? i.push(X(e, n)[0])
                      : i.push(U(e, n));
                  return i;
                },
                1
              ),
              n = this.rows(-1);
            return n.pop(), r.merge(n, e), n;
          }),
          a("row()", function (t, e) {
            return _e(this.rows(t, e));
          }),
          a("row().data()", function (t) {
            var e = this.context;
            if (void 0 === t)
              return e.length && this.length
                ? e[0].aoData[this[0]]._aData
                : void 0;
            var n = e[0].aoData[this[0]];
            return (
              (n._aData = t),
              Array.isArray(t) &&
                n.nTr &&
                n.nTr.id &&
                Q(e[0].rowId)(t, n.nTr.id),
              rt(e[0], this[0], "data"),
              this
            );
          }),
          a("row().node()", function () {
            var t = this.context;
            return (
              (t.length && this.length && t[0].aoData[this[0]].nTr) || null
            );
          }),
          a("row.add()", function (t) {
            t instanceof r && t.length && (t = t[0]);
            var e = this.iterator("table", function (e) {
              return t.nodeName && "TR" === t.nodeName.toUpperCase()
                ? X(e, t)[0]
                : U(e, t);
            });
            return this.row(e[0]);
          }),
          r(document).on("plugin-init.dt", function (t, e) {
            var n = new i(e),
              o = "on-plugin-init",
              a = "stateSaveParams." + o,
              s = "destroy. " + o;
            n.on(a, function (t, e, n) {
              for (
                var r = e.rowIdFn, o = e.aoData, i = [], a = 0;
                a < o.length;
                a++
              )
                o[a]._detailsShow && i.push("#" + r(o[a]._aData));
              n.childRows = i;
            }),
              n.on(s, function () {
                n.off(a + " " + s);
              });
            var l = n.state.loaded();
            l &&
              l.childRows &&
              n
                .rows(
                  r.map(l.childRows, function (t) {
                    return t.replace(/:/g, "\\:");
                  })
                )
                .every(function () {
                  he(e, null, "requestChild", [this]);
                });
          });
        var De = l.util.throttle(function (t) {
            ie(t[0]);
          }, 500),
          Ie = function (t, e) {
            var n = t.context;
            if (n.length) {
              var o = n[0].aoData[void 0 !== e ? e : t[0]];
              o &&
                o._details &&
                (o._details.remove(),
                (o._detailsShow = void 0),
                (o._details = void 0),
                r(o.nTr).removeClass("dt-hasChild"),
                De(n));
            }
          },
          Ae = function (t, e) {
            var n = t.context;
            if (n.length && t.length) {
              var o = n[0].aoData[t[0]];
              o._details &&
                ((o._detailsShow = e),
                e
                  ? (o._details.insertAfter(o.nTr),
                    r(o.nTr).addClass("dt-hasChild"))
                  : (o._details.detach(), r(o.nTr).removeClass("dt-hasChild")),
                he(n[0], null, "childRow", [e, t.row(t[0])]),
                Fe(n[0]),
                De(n));
            }
          },
          Fe = function (t) {
            var e = new i(t),
              n = ".dt.DT_details",
              r = "draw" + n,
              o = "column-sizing" + n,
              a = "destroy" + n,
              s = t.aoData;
            e.off(r + " " + o + " " + a),
              x(s, "_details").length > 0 &&
                (e.on(r, function (n, r) {
                  t === r &&
                    e
                      .rows({ page: "current" })
                      .eq(0)
                      .each(function (t) {
                        var e = s[t];
                        e._detailsShow && e._details.insertAfter(e.nTr);
                      });
                }),
                e.on(o, function (e, n, r, o) {
                  if (t === n)
                    for (var i, a = W(n), l = 0, c = s.length; l < c; l++)
                      (i = s[l])._details &&
                        i._details.children("td[colspan]").attr("colspan", a);
                }),
                e.on(a, function (n, r) {
                  if (t === r)
                    for (var o = 0, i = s.length; o < i; o++)
                      s[o]._details && Ie(e, o);
                }));
          },
          ke = "row().child",
          Ne = ke + "()";
        a(Ne, function (t, e) {
          var n = this.context;
          return void 0 === t
            ? n.length && this.length
              ? n[0].aoData[this[0]]._details
              : void 0
            : (!0 === t
                ? this.child.show()
                : !1 === t
                ? Ie(this)
                : n.length &&
                  this.length &&
                  (function (t, e, n, o) {
                    var i = [],
                      a = function (e, n) {
                        if (Array.isArray(e) || e instanceof r)
                          for (var o = 0, s = e.length; o < s; o++) a(e[o], n);
                        else if (
                          e.nodeName &&
                          "tr" === e.nodeName.toLowerCase()
                        )
                          i.push(e);
                        else {
                          var l = r("<tr><td></td></tr>").addClass(n);
                          (r("td", l).addClass(n).html(e)[0].colSpan = W(t)),
                            i.push(l[0]);
                        }
                      };
                    a(n, o),
                      e._details && e._details.detach(),
                      (e._details = r(i)),
                      e._detailsShow && e._details.insertAfter(e.nTr);
                  })(n[0], n[0].aoData[this[0]], t, e),
              this);
        }),
          a([ke + ".show()", Ne + ".show()"], function (t) {
            return Ae(this, !0), this;
          }),
          a([ke + ".hide()", Ne + ".hide()"], function () {
            return Ae(this, !1), this;
          }),
          a([ke + ".remove()", Ne + ".remove()"], function () {
            return Ie(this), this;
          }),
          a(ke + ".isShown()", function () {
            var t = this.context;
            return (
              (t.length && this.length && t[0].aoData[this[0]]._detailsShow) ||
              !1
            );
          });
        var Le = /^([^:]+):(name|visIdx|visible)$/,
          He = function (t, e, n, r, o) {
            for (var i = [], a = 0, s = o.length; a < s; a++)
              i.push(V(t, o[a], e));
            return i;
          };
        a("columns()", function (t, e) {
          void 0 === t ? (t = "") : r.isPlainObject(t) && ((e = t), (t = "")),
            (e = Ce(e));
          var n = this.iterator(
            "table",
            function (n) {
              return (function (t, e, n) {
                var o = t.aoColumns,
                  i = x(o, "sName"),
                  a = x(o, "nTh");
                return Se(
                  "column",
                  e,
                  function (e) {
                    var s = g(e);
                    if ("" === e) return S(o.length);
                    if (null !== s) return [s >= 0 ? s : o.length + s];
                    if ("function" == typeof e) {
                      var l = Te(t, n);
                      return r.map(o, function (n, r) {
                        return e(r, He(t, r, 0, 0, l), a[r]) ? r : null;
                      });
                    }
                    var c = "string" == typeof e ? e.match(Le) : "";
                    if (c)
                      switch (c[2]) {
                        case "visIdx":
                        case "visible":
                          var u = parseInt(c[1], 10);
                          if (u < 0) {
                            var d = r.map(o, function (t, e) {
                              return t.bVisible ? e : null;
                            });
                            return [d[d.length + u]];
                          }
                          return [R(t, u)];
                        case "name":
                          return r.map(i, function (t, e) {
                            return t === c[1] ? e : null;
                          });
                        default:
                          return [];
                      }
                    if (e.nodeName && e._DT_CellIndex)
                      return [e._DT_CellIndex.column];
                    var f = r(a)
                      .filter(e)
                      .map(function () {
                        return r.inArray(this, a);
                      })
                      .toArray();
                    if (f.length || !e.nodeName) return f;
                    var p = r(e).closest("*[data-dt-column]");
                    return p.length ? [p.data("dt-column")] : [];
                  },
                  t,
                  n
                );
              })(n, t, e);
            },
            1
          );
          return (n.selector.cols = t), (n.selector.opts = e), n;
        }),
          s("columns().header()", "column().header()", function (t, e) {
            return this.iterator(
              "column",
              function (t, e) {
                return t.aoColumns[e].nTh;
              },
              1
            );
          }),
          s("columns().footer()", "column().footer()", function (t, e) {
            return this.iterator(
              "column",
              function (t, e) {
                return t.aoColumns[e].nTf;
              },
              1
            );
          }),
          s("columns().data()", "column().data()", function () {
            return this.iterator("column-rows", He, 1);
          }),
          s("columns().dataSrc()", "column().dataSrc()", function () {
            return this.iterator(
              "column",
              function (t, e) {
                return t.aoColumns[e].mData;
              },
              1
            );
          }),
          s("columns().cache()", "column().cache()", function (t) {
            return this.iterator(
              "column-rows",
              function (e, n, r, o, i) {
                return w(
                  e.aoData,
                  i,
                  "search" === t ? "_aFilterData" : "_aSortData",
                  n
                );
              },
              1
            );
          }),
          s("columns().nodes()", "column().nodes()", function () {
            return this.iterator(
              "column-rows",
              function (t, e, n, r, o) {
                return w(t.aoData, o, "anCells", e);
              },
              1
            );
          }),
          s("columns().visible()", "column().visible()", function (t, e) {
            var n = this,
              o = this.iterator("column", function (e, n) {
                if (void 0 === t) return e.aoColumns[n].bVisible;
                !(function (t, e, n) {
                  var o,
                    i,
                    a,
                    s,
                    l = t.aoColumns,
                    c = l[e],
                    u = t.aoData;
                  if (void 0 === n) return c.bVisible;
                  if (c.bVisible !== n) {
                    if (n) {
                      var d = r.inArray(!0, x(l, "bVisible"), e + 1);
                      for (i = 0, a = u.length; i < a; i++)
                        (s = u[i].nTr),
                          (o = u[i].anCells),
                          s && s.insertBefore(o[e], o[d] || null);
                    } else r(x(t.aoData, "anCells", e)).detach();
                    c.bVisible = n;
                  }
                })(e, n, t);
              });
            return (
              void 0 !== t &&
                this.iterator("table", function (o) {
                  lt(o, o.aoHeader),
                    lt(o, o.aoFooter),
                    o.aiDisplay.length ||
                      r(o.nTBody).find("td[colspan]").attr("colspan", W(o)),
                    ie(o),
                    n.iterator("column", function (n, r) {
                      he(n, null, "column-visibility", [n, r, t, e]);
                    }),
                    (void 0 === e || e) && n.columns.adjust();
                }),
              o
            );
          }),
          s("columns().indexes()", "column().index()", function (t) {
            return this.iterator(
              "column",
              function (e, n) {
                return "visible" === t ? M(e, n) : n;
              },
              1
            );
          }),
          a("columns.adjust()", function () {
            return this.iterator(
              "table",
              function (t) {
                O(t);
              },
              1
            );
          }),
          a("column.index()", function (t, e) {
            if (0 !== this.context.length) {
              var n = this.context[0];
              if ("fromVisible" === t || "toData" === t) return R(n, e);
              if ("fromData" === t || "toVisible" === t) return M(n, e);
            }
          }),
          a("column()", function (t, e) {
            return _e(this.columns(t, e));
          });
        a("cells()", function (t, e, n) {
          if (
            (r.isPlainObject(t) &&
              (void 0 === t.row
                ? ((n = t), (t = null))
                : ((n = e), (e = null))),
            r.isPlainObject(e) && ((n = e), (e = null)),
            null == e)
          )
            return this.iterator("table", function (e) {
              return (function (t, e, n) {
                var o,
                  i,
                  a,
                  s,
                  l,
                  c,
                  u,
                  d = t.aoData,
                  f = Te(t, n),
                  p = C(w(d, f, "anCells")),
                  h = r(D([], p)),
                  m = t.aoColumns.length;
                return Se(
                  "cell",
                  e,
                  function (e) {
                    var n = "function" == typeof e;
                    if (null == e || n) {
                      for (i = [], a = 0, s = f.length; a < s; a++)
                        for (o = f[a], l = 0; l < m; l++)
                          (c = { row: o, column: l }),
                            n
                              ? ((u = d[o]),
                                e(
                                  c,
                                  V(t, o, l),
                                  u.anCells ? u.anCells[l] : null
                                ) && i.push(c))
                              : i.push(c);
                      return i;
                    }
                    if (r.isPlainObject(e))
                      return void 0 !== e.column &&
                        void 0 !== e.row &&
                        -1 !== r.inArray(e.row, f)
                        ? [e]
                        : [];
                    var p = h
                      .filter(e)
                      .map(function (t, e) {
                        return {
                          row: e._DT_CellIndex.row,
                          column: e._DT_CellIndex.column,
                        };
                      })
                      .toArray();
                    return p.length || !e.nodeName
                      ? p
                      : (u = r(e).closest("*[data-dt-row]")).length
                      ? [{ row: u.data("dt-row"), column: u.data("dt-column") }]
                      : [];
                  },
                  t,
                  n
                );
              })(e, t, Ce(n));
            });
          var o,
            i,
            a,
            s,
            l = n ? { page: n.page, order: n.order, search: n.search } : {},
            c = this.columns(e, l),
            u = this.rows(t, l),
            d = this.iterator(
              "table",
              function (t, e) {
                var n = [];
                for (o = 0, i = u[e].length; o < i; o++)
                  for (a = 0, s = c[e].length; a < s; a++)
                    n.push({ row: u[e][o], column: c[e][a] });
                return n;
              },
              1
            ),
            f = n && n.selected ? this.cells(d, n) : d;
          return r.extend(f.selector, { cols: e, rows: t, opts: n }), f;
        }),
          s("cells().nodes()", "cell().node()", function () {
            return this.iterator(
              "cell",
              function (t, e, n) {
                var r = t.aoData[e];
                return r && r.anCells ? r.anCells[n] : void 0;
              },
              1
            );
          }),
          a("cells().data()", function () {
            return this.iterator(
              "cell",
              function (t, e, n) {
                return V(t, e, n);
              },
              1
            );
          }),
          s("cells().cache()", "cell().cache()", function (t) {
            return (
              (t = "search" === t ? "_aFilterData" : "_aSortData"),
              this.iterator(
                "cell",
                function (e, n, r) {
                  return e.aoData[n][t][r];
                },
                1
              )
            );
          }),
          s("cells().render()", "cell().render()", function (t) {
            return this.iterator(
              "cell",
              function (e, n, r) {
                return V(e, n, r, t);
              },
              1
            );
          }),
          s("cells().indexes()", "cell().index()", function () {
            return this.iterator(
              "cell",
              function (t, e, n) {
                return { row: e, column: n, columnVisible: M(t, n) };
              },
              1
            );
          }),
          s("cells().invalidate()", "cell().invalidate()", function (t) {
            return this.iterator("cell", function (e, n, r) {
              rt(e, n, t, r);
            });
          }),
          a("cell()", function (t, e, n) {
            return _e(this.cells(t, e, n));
          }),
          a("cell().data()", function (t) {
            var e = this.context,
              n = this[0];
            return void 0 === t
              ? e.length && n.length
                ? V(e[0], n[0].row, n[0].column)
                : void 0
              : (J(e[0], n[0].row, n[0].column, t),
                rt(e[0], n[0].row, "data", n[0].column),
                this);
          }),
          a("order()", function (t, e) {
            var n = this.context;
            return void 0 === t
              ? 0 !== n.length
                ? n[0].aaSorting
                : void 0
              : ("number" == typeof t
                  ? (t = [[t, e]])
                  : t.length &&
                    !Array.isArray(t[0]) &&
                    (t = Array.prototype.slice.call(arguments)),
                this.iterator("table", function (e) {
                  e.aaSorting = t.slice();
                }));
          }),
          a("order.listener()", function (t, e, n) {
            return this.iterator("table", function (r) {
              ne(r, t, e, n);
            });
          }),
          a("order.fixed()", function (t) {
            if (!t) {
              var e = this.context,
                n = e.length ? e[0].aaSortingFixed : void 0;
              return Array.isArray(n) ? { pre: n } : n;
            }
            return this.iterator("table", function (e) {
              e.aaSortingFixed = r.extend(!0, {}, t);
            });
          }),
          a(["columns().order()", "column().order()"], function (t) {
            var e = this;
            return this.iterator("table", function (n, o) {
              var i = [];
              r.each(e[o], function (e, n) {
                i.push([n, t]);
              }),
                (n.aaSorting = i);
            });
          }),
          a("search()", function (t, e, n, o) {
            var i = this.context;
            return void 0 === t
              ? 0 !== i.length
                ? i[0].oPreviousSearch.sSearch
                : void 0
              : this.iterator("table", function (i) {
                  i.oFeatures.bFilter &&
                    xt(
                      i,
                      r.extend({}, i.oPreviousSearch, {
                        sSearch: t + "",
                        bRegex: null !== e && e,
                        bSmart: null === n || n,
                        bCaseInsensitive: null === o || o,
                      }),
                      1
                    );
                });
          }),
          s("columns().search()", "column().search()", function (t, e, n, o) {
            return this.iterator("column", function (i, a) {
              var s = i.aoPreSearchCols;
              if (void 0 === t) return s[a].sSearch;
              i.oFeatures.bFilter &&
                (r.extend(s[a], {
                  sSearch: t + "",
                  bRegex: null !== e && e,
                  bSmart: null === n || n,
                  bCaseInsensitive: null === o || o,
                }),
                xt(i, i.oPreviousSearch, 1));
            });
          }),
          a("state()", function () {
            return this.context.length ? this.context[0].oSavedState : null;
          }),
          a("state.clear()", function () {
            return this.iterator("table", function (t) {
              t.fnStateSaveCallback.call(t.oInstance, t, {});
            });
          }),
          a("state.loaded()", function () {
            return this.context.length ? this.context[0].oLoadedState : null;
          }),
          a("state.save()", function () {
            return this.iterator("table", function (t) {
              ie(t);
            });
          }),
          (l.use = function (t, e) {
            "lib" === e || t.fn
              ? (r = t)
              : ("win" == e || t.document) &&
                ((window = t), (document = t.document));
          }),
          (l.factory = function (t, e) {
            var n = !1;
            return (
              t && t.document && ((window = t), (document = t.document)),
              e && e.fn && e.fn.jquery && ((r = e), (n = !0)),
              n
            );
          }),
          (l.versionCheck = l.fnVersionCheck =
            function (t) {
              for (
                var e,
                  n,
                  r = l.version.split("."),
                  o = t.split("."),
                  i = 0,
                  a = o.length;
                i < a;
                i++
              )
                if (
                  (e = parseInt(r[i], 10) || 0) !==
                  (n = parseInt(o[i], 10) || 0)
                )
                  return e > n;
              return !0;
            }),
          (l.isDataTable = l.fnIsDataTable =
            function (t) {
              var e = r(t).get(0),
                n = !1;
              return (
                t instanceof l.Api ||
                (r.each(l.settings, function (t, o) {
                  var i = o.nScrollHead ? r("table", o.nScrollHead)[0] : null,
                    a = o.nScrollFoot ? r("table", o.nScrollFoot)[0] : null;
                  (o.nTable !== e && i !== e && a !== e) || (n = !0);
                }),
                n)
              );
            }),
          (l.tables = l.fnTables =
            function (t) {
              var e = !1;
              r.isPlainObject(t) && ((e = t.api), (t = t.visible));
              var n = r.map(l.settings, function (e) {
                if (!t || (t && r(e.nTable).is(":visible"))) return e.nTable;
              });
              return e ? new i(n) : n;
            }),
          (l.camelToHungarian = F),
          a("$()", function (t, e) {
            var n = this.rows(e).nodes(),
              o = r(n);
            return r([].concat(o.filter(t).toArray(), o.find(t).toArray()));
          }),
          r.each(["on", "one", "off"], function (t, e) {
            a(e + "()", function () {
              var t = Array.prototype.slice.call(arguments);
              t[0] = r
                .map(t[0].split(/\s/), function (t) {
                  return t.match(/\.dt\b/) ? t : t + ".dt";
                })
                .join(" ");
              var n = r(this.tables().nodes());
              return n[e].apply(n, t), this;
            });
          }),
          a("clear()", function () {
            return this.iterator("table", function (t) {
              et(t);
            });
          }),
          a("settings()", function () {
            return new i(this.context, this.context);
          }),
          a("init()", function () {
            var t = this.context;
            return t.length ? t[0].oInit : null;
          }),
          a("data()", function () {
            return this.iterator("table", function (t) {
              return x(t.aoData, "_aData");
            }).flatten();
          }),
          a("destroy()", function (t) {
            return (
              (t = t || !1),
              this.iterator("table", function (e) {
                var n,
                  o = e.oClasses,
                  a = e.nTable,
                  s = e.nTBody,
                  c = e.nTHead,
                  u = e.nTFoot,
                  d = r(a),
                  f = r(s),
                  p = r(e.nTableWrapper),
                  h = r.map(e.aoData, function (t) {
                    return t.nTr;
                  });
                (e.bDestroying = !0),
                  he(e, "aoDestroyCallback", "destroy", [e]),
                  t || new i(e).columns().visible(!0),
                  p.off(".DT").find(":not(tbody *)").off(".DT"),
                  r(window).off(".DT-" + e.sInstance),
                  a != c.parentNode &&
                    (d.children("thead").detach(), d.append(c)),
                  u &&
                    a != u.parentNode &&
                    (d.children("tfoot").detach(), d.append(u)),
                  (e.aaSorting = []),
                  (e.aaSortingFixed = []),
                  re(e),
                  r(h).removeClass(e.asStripeClasses.join(" ")),
                  r("th, td", c).removeClass(
                    o.sSortable +
                      " " +
                      o.sSortableAsc +
                      " " +
                      o.sSortableDesc +
                      " " +
                      o.sSortableNone
                  ),
                  f.children().detach(),
                  f.append(h);
                var m = e.nTableWrapper.parentNode,
                  g = t ? "remove" : "detach";
                d[g](),
                  p[g](),
                  !t &&
                    m &&
                    (m.insertBefore(a, e.nTableReinsertBefore),
                    d.css("width", e.sDestroyWidth).removeClass(o.sTable),
                    (n = e.asDestroyStripes.length) &&
                      f.children().each(function (t) {
                        r(this).addClass(e.asDestroyStripes[t % n]);
                      }));
                var v = r.inArray(e, l.settings);
                -1 !== v && l.settings.splice(v, 1);
              })
            );
          }),
          r.each(["column", "row", "cell"], function (t, e) {
            a(e + "s().every()", function (t) {
              var n = this.selector.opts,
                r = this;
              return this.iterator(e, function (o, i, a, s, l) {
                t.call(
                  r[e](i, "cell" === e ? a : n, "cell" === e ? n : void 0),
                  i,
                  a,
                  s,
                  l
                );
              });
            });
          }),
          a("i18n()", function (t, e, n) {
            var o = this.context[0],
              i = Z(t)(o.oLanguage);
            return (
              void 0 === i && (i = e),
              void 0 !== n &&
                r.isPlainObject(i) &&
                (i = void 0 !== i[n] ? i[n] : i._),
              i.replace("%d", n)
            );
          }),
          (l.version = "1.13.4"),
          (l.settings = []),
          (l.models = {}),
          (l.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0,
            return: !1,
          }),
          (l.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1,
          }),
          (l.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null,
          }),
          (l.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function (t) {
              return t
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function (t) {
              try {
                return JSON.parse(
                  (-1 === t.iStateDuration
                    ? sessionStorage
                    : localStorage
                  ).getItem(
                    "DataTables_" + t.sInstance + "_" + location.pathname
                  )
                );
              } catch (t) {
                return {};
              }
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function (t, e) {
              try {
                (-1 === t.iStateDuration
                  ? sessionStorage
                  : localStorage
                ).setItem(
                  "DataTables_" + t.sInstance + "_" + location.pathname,
                  JSON.stringify(e)
                );
              } catch (t) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
              oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending",
              },
              oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous",
              },
              sEmptyTable: "No data available in table",
              sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
              sInfoEmpty: "Showing 0 to 0 of 0 entries",
              sInfoFiltered: "(filtered from _MAX_ total entries)",
              sInfoPostFix: "",
              sDecimal: "",
              sThousands: ",",
              sLengthMenu: "Show _MENU_ entries",
              sLoadingRecords: "Loading...",
              sProcessing: "",
              sSearch: "Search:",
              sSearchPlaceholder: "",
              sUrl: "",
              sZeroRecords: "No matching records found",
            },
            oSearch: r.extend({}, l.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId",
          }),
          A(l.defaults),
          (l.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null,
          }),
          A(l.defaults.column),
          (l.models.oSettings = {
            oFeatures: {
              bAutoWidth: null,
              bDeferRender: null,
              bFilter: null,
              bInfo: null,
              bLengthChange: null,
              bPaginate: null,
              bProcessing: null,
              bServerSide: null,
              bSort: null,
              bSortMulti: null,
              bSortClasses: null,
              bStateSave: null,
            },
            oScroll: {
              bCollapse: null,
              iBarWidth: 0,
              sX: null,
              sXInner: null,
              sY: null,
            },
            oLanguage: { fnInfoCallback: null },
            oBrowser: {
              bScrollOversize: !1,
              bScrollbarLeft: !1,
              bBounding: !1,
              barWidth: 0,
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            jqXHR: null,
            json: void 0,
            oAjaxData: void 0,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function () {
              return "ssp" == ve(this)
                ? 1 * this._iRecordsTotal
                : this.aiDisplayMaster.length;
            },
            fnRecordsDisplay: function () {
              return "ssp" == ve(this)
                ? 1 * this._iRecordsDisplay
                : this.aiDisplay.length;
            },
            fnDisplayEnd: function () {
              var t = this._iDisplayLength,
                e = this._iDisplayStart,
                n = e + t,
                r = this.aiDisplay.length,
                o = this.oFeatures,
                i = o.bPaginate;
              return o.bServerSide
                ? !1 === i || -1 === t
                  ? e + r
                  : Math.min(e + t, this._iRecordsDisplay)
                : !i || n > r || -1 === t
                ? r
                : n;
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null,
          }),
          (l.ext = o =
            {
              buttons: {},
              classes: {},
              builder: "-source-",
              errMode: "alert",
              feature: [],
              search: [],
              selector: { cell: [], column: [], row: [] },
              internal: {},
              legacy: { ajax: null },
              pager: {},
              renderer: { pageButton: {}, header: {} },
              order: {},
              type: { detect: [], search: {}, order: {} },
              _unique: 0,
              fnVersionCheck: l.fnVersionCheck,
              iApiIndex: 0,
              oJUIClasses: {},
              sVersion: l.version,
            }),
          r.extend(o, {
            afnFiltering: o.search,
            aTypes: o.type.detect,
            ofnSearch: o.type.search,
            oSort: o.type.order,
            afnSortData: o.order,
            aoFeatures: o.feature,
            oApi: o.internal,
            oStdClasses: o.classes,
            oPagination: o.pager,
          }),
          r.extend(l.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_desc_disabled",
            sSortableDesc: "sorting_asc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: "",
          });
        var je = l.ext.pager;
        function Ee(t, e) {
          var n = [],
            r = je.numbers_length,
            o = Math.floor(r / 2);
          return (
            e <= r
              ? (n = S(0, e))
              : t <= o
              ? ((n = S(0, r - 2)).push("ellipsis"), n.push(e - 1))
              : t >= e - 1 - o
              ? ((n = S(e - (r - 2), e)).splice(0, 0, "ellipsis"),
                n.splice(0, 0, 0))
              : ((n = S(t - o + 2, t + o - 1)).push("ellipsis"),
                n.push(e - 1),
                n.splice(0, 0, "ellipsis"),
                n.splice(0, 0, 0)),
            (n.DT_el = "span"),
            n
          );
        }
        r.extend(je, {
          simple: function (t, e) {
            return ["previous", "next"];
          },
          full: function (t, e) {
            return ["first", "previous", "next", "last"];
          },
          numbers: function (t, e) {
            return [Ee(t, e)];
          },
          simple_numbers: function (t, e) {
            return ["previous", Ee(t, e), "next"];
          },
          full_numbers: function (t, e) {
            return ["first", "previous", Ee(t, e), "next", "last"];
          },
          first_last_numbers: function (t, e) {
            return ["first", Ee(t, e), "last"];
          },
          _numbers: Ee,
          numbers_length: 7,
        }),
          r.extend(!0, l.ext.renderer, {
            pageButton: {
              _: function (t, e, n, o, i, a) {
                var s,
                  l,
                  c,
                  u = t.oClasses,
                  d = t.oLanguage.oPaginate,
                  f = t.oLanguage.oAria.paginate || {},
                  p = function (e, o) {
                    var c,
                      h,
                      m,
                      g,
                      v = u.sPageButtonDisabled,
                      b = function (e) {
                        Rt(t, e.data.action, !0);
                      };
                    for (c = 0, h = o.length; c < h; c++)
                      if (((m = o[c]), Array.isArray(m))) {
                        var y = r("<" + (m.DT_el || "div") + "/>").appendTo(e);
                        p(y, m);
                      } else {
                        switch (((s = null), (l = m), (g = t.iTabIndex), m)) {
                          case "ellipsis":
                            e.append('<span class="ellipsis">&#x2026;</span>');
                            break;
                          case "first":
                            (s = d.sFirst),
                              0 === i && ((g = -1), (l += " " + v));
                            break;
                          case "previous":
                            (s = d.sPrevious),
                              0 === i && ((g = -1), (l += " " + v));
                            break;
                          case "next":
                            (s = d.sNext),
                              (0 !== a && i !== a - 1) ||
                                ((g = -1), (l += " " + v));
                            break;
                          case "last":
                            (s = d.sLast),
                              (0 !== a && i !== a - 1) ||
                                ((g = -1), (l += " " + v));
                            break;
                          default:
                            (s = t.fnFormatNumber(m + 1)),
                              (l = i === m ? u.sPageButtonActive : "");
                        }
                        if (null !== s) {
                          var x = t.oInit.pagingTag || "a",
                            w = -1 !== l.indexOf(v);
                          fe(
                            r("<" + x + ">", {
                              class: u.sPageButton + " " + l,
                              "aria-controls": t.sTableId,
                              "aria-disabled": w ? "true" : null,
                              "aria-label": f[m],
                              "aria-role": "link",
                              "aria-current":
                                l === u.sPageButtonActive ? "page" : null,
                              "data-dt-idx": m,
                              tabindex: g,
                              id:
                                0 === n && "string" == typeof m
                                  ? t.sTableId + "_" + m
                                  : null,
                            })
                              .html(s)
                              .appendTo(e),
                            { action: m },
                            b
                          );
                        }
                      }
                  };
                try {
                  c = r(e).find(document.activeElement).data("dt-idx");
                } catch (t) {}
                p(r(e).empty(), o),
                  void 0 !== c &&
                    r(e)
                      .find("[data-dt-idx=" + c + "]")
                      .trigger("focus");
              },
            },
          }),
          r.extend(l.ext.type.detect, [
            function (t, e) {
              var n = e.oLanguage.sDecimal;
              return b(t, n) ? "num" + n : null;
            },
            function (t, e) {
              if (t && !(t instanceof Date) && !f.test(t)) return null;
              var n = Date.parse(t);
              return (null !== n && !isNaN(n)) || m(t) ? "date" : null;
            },
            function (t, e) {
              var n = e.oLanguage.sDecimal;
              return b(t, n, !0) ? "num-fmt" + n : null;
            },
            function (t, e) {
              var n = e.oLanguage.sDecimal;
              return y(t, n) ? "html-num" + n : null;
            },
            function (t, e) {
              var n = e.oLanguage.sDecimal;
              return y(t, n, !0) ? "html-num-fmt" + n : null;
            },
            function (t, e) {
              return m(t) || ("string" == typeof t && -1 !== t.indexOf("<"))
                ? "html"
                : null;
            },
          ]),
          r.extend(l.ext.type.search, {
            html: function (t) {
              return m(t)
                ? t
                : "string" == typeof t
                ? t.replace(u, " ").replace(d, "")
                : "";
            },
            string: function (t) {
              return m(t) ? t : "string" == typeof t ? t.replace(u, " ") : t;
            },
          });
        var Pe = function (t, e, n, r) {
          if (0 !== t && (!t || "-" === t)) return -1 / 0;
          let o = typeof t;
          return "number" === o || "bigint" === o
            ? t
            : (e && (t = v(t, e)),
              t.replace &&
                (n && (t = t.replace(n, "")), r && (t = t.replace(r, ""))),
              1 * t);
        };
        function Be(t) {
          r.each(
            {
              num: function (e) {
                return Pe(e, t);
              },
              "num-fmt": function (e) {
                return Pe(e, t, h);
              },
              "html-num": function (e) {
                return Pe(e, t, d);
              },
              "html-num-fmt": function (e) {
                return Pe(e, t, d, h);
              },
            },
            function (e, n) {
              (o.type.order[e + t + "-pre"] = n),
                e.match(/^html\-/) &&
                  (o.type.search[e + t] = o.type.search.html);
            }
          );
        }
        r.extend(o.type.order, {
          "date-pre": function (t) {
            var e = Date.parse(t);
            return isNaN(e) ? -1 / 0 : e;
          },
          "html-pre": function (t) {
            return m(t)
              ? ""
              : t.replace
              ? t.replace(/<.*?>/g, "").toLowerCase()
              : t + "";
          },
          "string-pre": function (t) {
            return m(t)
              ? ""
              : "string" == typeof t
              ? t.toLowerCase()
              : t.toString
              ? t.toString()
              : "";
          },
          "string-asc": function (t, e) {
            return t < e ? -1 : t > e ? 1 : 0;
          },
          "string-desc": function (t, e) {
            return t < e ? 1 : t > e ? -1 : 0;
          },
        }),
          Be(""),
          r.extend(!0, l.ext.renderer, {
            header: {
              _: function (t, e, n, o) {
                r(t.nTable).on("order.dt.DT", function (r, i, a, s) {
                  if (t === i) {
                    var l = n.idx;
                    e.removeClass(o.sSortAsc + " " + o.sSortDesc).addClass(
                      "asc" == s[l]
                        ? o.sSortAsc
                        : "desc" == s[l]
                        ? o.sSortDesc
                        : n.sSortingClass
                    );
                  }
                });
              },
              jqueryui: function (t, e, n, o) {
                r("<div/>")
                  .addClass(o.sSortJUIWrapper)
                  .append(e.contents())
                  .append(
                    r("<span/>").addClass(
                      o.sSortIcon + " " + n.sSortingClassJUI
                    )
                  )
                  .appendTo(e),
                  r(t.nTable).on("order.dt.DT", function (r, i, a, s) {
                    if (t === i) {
                      var l = n.idx;
                      e
                        .removeClass(o.sSortAsc + " " + o.sSortDesc)
                        .addClass(
                          "asc" == s[l]
                            ? o.sSortAsc
                            : "desc" == s[l]
                            ? o.sSortDesc
                            : n.sSortingClass
                        ),
                        e
                          .find("span." + o.sSortIcon)
                          .removeClass(
                            o.sSortJUIAsc +
                              " " +
                              o.sSortJUIDesc +
                              " " +
                              o.sSortJUI +
                              " " +
                              o.sSortJUIAscAllowed +
                              " " +
                              o.sSortJUIDescAllowed
                          )
                          .addClass(
                            "asc" == s[l]
                              ? o.sSortJUIAsc
                              : "desc" == s[l]
                              ? o.sSortJUIDesc
                              : n.sSortingClassJUI
                          );
                    }
                  });
              },
            },
          });
        var Oe = function (t) {
          return (
            Array.isArray(t) && (t = t.join(",")),
            "string" == typeof t
              ? t
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
              : t
          );
        };
        function Re(t, e, n, r, o) {
          return window.moment
            ? t[e](o)
            : window.luxon
            ? t[n](o)
            : r
            ? t[r](o)
            : t;
        }
        var Me = !1;
        function We(t, e, n) {
          var r;
          if (window.moment) {
            if (!(r = window.moment.utc(t, e, n, !0)).isValid()) return null;
          } else if (window.luxon) {
            if (
              !(r =
                e && "string" == typeof t
                  ? window.luxon.DateTime.fromFormat(t, e)
                  : window.luxon.DateTime.fromISO(t)).isValid
            )
              return null;
            r.setLocale(n);
          } else
            e
              ? (Me ||
                  alert(
                    "DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"
                  ),
                (Me = !0))
              : (r = new Date(t));
          return r;
        }
        function qe(t) {
          return function (e, n, r, o) {
            0 === arguments.length
              ? ((r = "en"), (n = null), (e = null))
              : 1 === arguments.length
              ? ((r = "en"), (n = e), (e = null))
              : 2 === arguments.length && ((r = n), (n = e), (e = null));
            var i = "datetime-" + n;
            return (
              l.ext.type.order[i] ||
                (l.ext.type.detect.unshift(function (t) {
                  return t === i && i;
                }),
                (l.ext.type.order[i + "-asc"] = function (t, e) {
                  var n = t.valueOf(),
                    r = e.valueOf();
                  return n === r ? 0 : n < r ? -1 : 1;
                }),
                (l.ext.type.order[i + "-desc"] = function (t, e) {
                  var n = t.valueOf(),
                    r = e.valueOf();
                  return n === r ? 0 : n > r ? -1 : 1;
                })),
              function (a, s) {
                if (null == a)
                  if ("--now" === o) {
                    var l = new Date();
                    a = new Date(
                      Date.UTC(
                        l.getFullYear(),
                        l.getMonth(),
                        l.getDate(),
                        l.getHours(),
                        l.getMinutes(),
                        l.getSeconds()
                      )
                    );
                  } else a = "";
                if ("type" === s) return i;
                if ("" === a)
                  return "sort" !== s ? "" : We("0000-01-01 00:00:00", null, r);
                if (
                  null !== n &&
                  e === n &&
                  "sort" !== s &&
                  "type" !== s &&
                  !(a instanceof Date)
                )
                  return a;
                var c = We(a, e, r);
                if (null === c) return a;
                if ("sort" === s) return c;
                var u =
                  null === n
                    ? Re(c, "toDate", "toJSDate", "")[t]()
                    : Re(c, "format", "toFormat", "toISOString", n);
                return "display" === s ? Oe(u) : u;
              }
            );
          };
        }
        var ze = ",",
          $e = ".";
        if (Intl)
          try {
            for (
              var Ue = new Intl.NumberFormat().formatToParts(100000.1), Xe = 0;
              Xe < Ue.length;
              Xe++
            )
              "group" === Ue[Xe].type
                ? (ze = Ue[Xe].value)
                : "decimal" === Ue[Xe].type && ($e = Ue[Xe].value);
          } catch (t) {}
        function Ve(t) {
          return function () {
            var e = [le(this[l.ext.iApiIndex])].concat(
              Array.prototype.slice.call(arguments)
            );
            return l.ext.internal[t].apply(this, e);
          };
        }
        (l.datetime = function (t, e) {
          var n = "datetime-detect-" + t;
          e || (e = "en"),
            l.ext.type.order[n] ||
              (l.ext.type.detect.unshift(function (r) {
                var o = We(r, t, e);
                return !("" !== r && !o) && n;
              }),
              (l.ext.type.order[n + "-pre"] = function (n) {
                return We(n, t, e) || 0;
              }));
        }),
          (l.render = {
            date: qe("toLocaleDateString"),
            datetime: qe("toLocaleString"),
            time: qe("toLocaleTimeString"),
            number: function (t, e, n, r, o) {
              return (
                null == t && (t = ze),
                null == e && (e = $e),
                {
                  display: function (i) {
                    if ("number" != typeof i && "string" != typeof i) return i;
                    if ("" === i || null === i) return i;
                    var a = i < 0 ? "-" : "",
                      s = parseFloat(i);
                    if (isNaN(s)) return Oe(i);
                    (s = s.toFixed(n)), (i = Math.abs(s));
                    var l = parseInt(i, 10),
                      c = n ? e + (i - l).toFixed(n).substring(2) : "";
                    return (
                      0 === l && 0 === parseFloat(c) && (a = ""),
                      a +
                        (r || "") +
                        l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t) +
                        c +
                        (o || "")
                    );
                  },
                }
              );
            },
            text: function () {
              return { display: Oe, filter: Oe };
            },
          }),
          r.extend(l.ext.internal, {
            _fnExternApiFunc: Ve,
            _fnBuildAjax: ht,
            _fnAjaxUpdate: mt,
            _fnAjaxParameters: gt,
            _fnAjaxUpdateDraw: vt,
            _fnAjaxDataSrc: bt,
            _fnAddColumn: P,
            _fnColumnOptions: B,
            _fnAdjustColumnSizing: O,
            _fnVisibleToColumnIndex: R,
            _fnColumnIndexToVisible: M,
            _fnVisbleColumns: W,
            _fnGetColumns: q,
            _fnColumnTypes: z,
            _fnApplyColumnDefs: $,
            _fnHungarianMap: A,
            _fnCamelToHungarian: F,
            _fnLanguageCompat: k,
            _fnBrowserDetect: j,
            _fnAddData: U,
            _fnAddTr: X,
            _fnNodeToDataIndex: function (t, e) {
              return void 0 !== e._DT_RowIndex ? e._DT_RowIndex : null;
            },
            _fnNodeToColumnIndex: function (t, e, n) {
              return r.inArray(n, t.aoData[e].anCells);
            },
            _fnGetCellData: V,
            _fnSetCellData: J,
            _fnSplitObjNotation: Y,
            _fnGetObjectDataFn: Z,
            _fnSetObjectDataFn: Q,
            _fnGetDataMaster: tt,
            _fnClearTable: et,
            _fnDeleteIndex: nt,
            _fnInvalidate: rt,
            _fnGetRowElements: ot,
            _fnCreateTr: it,
            _fnBuildHead: st,
            _fnDrawHead: lt,
            _fnDraw: ct,
            _fnReDraw: ut,
            _fnAddOptionsHtml: dt,
            _fnDetectHeader: ft,
            _fnGetUniqueThs: pt,
            _fnFeatureHtmlFilter: yt,
            _fnFilterComplete: xt,
            _fnFilterCustom: wt,
            _fnFilterColumn: St,
            _fnFilter: Ct,
            _fnFilterCreateSearch: _t,
            _fnEscapeRegex: Tt,
            _fnFilterData: At,
            _fnFeatureHtmlInfo: Nt,
            _fnUpdateInfo: Lt,
            _fnInfoMacros: Ht,
            _fnInitialise: jt,
            _fnInitComplete: Et,
            _fnLengthChange: Pt,
            _fnFeatureHtmlLength: Bt,
            _fnFeatureHtmlPaginate: Ot,
            _fnPageChange: Rt,
            _fnFeatureHtmlProcessing: Mt,
            _fnProcessingDisplay: Wt,
            _fnFeatureHtmlTable: qt,
            _fnScrollDraw: zt,
            _fnApplyToChildren: $t,
            _fnCalculateColumnWidths: Xt,
            _fnThrottle: Vt,
            _fnConvertToWidth: Jt,
            _fnGetWidestNode: Kt,
            _fnGetMaxLenString: Gt,
            _fnStringToCss: Yt,
            _fnSortFlatten: Zt,
            _fnSort: Qt,
            _fnSortAria: te,
            _fnSortListener: ee,
            _fnSortAttachListener: ne,
            _fnSortingClasses: re,
            _fnSortData: oe,
            _fnSaveState: ie,
            _fnLoadState: ae,
            _fnImplementState: se,
            _fnSettingsFromNode: le,
            _fnLog: ce,
            _fnMap: ue,
            _fnBindAction: fe,
            _fnCallbackReg: pe,
            _fnCallbackFire: he,
            _fnLengthOverflow: me,
            _fnRenderer: ge,
            _fnDataSource: ve,
            _fnRowAttributes: at,
            _fnExtend: de,
            _fnCalculateEnd: function () {},
          }),
          (r.fn.dataTable = l),
          (l.$ = r),
          (r.fn.dataTableSettings = l.settings),
          (r.fn.dataTableExt = l.ext),
          (r.fn.DataTable = function (t) {
            return r(this).dataTable(t).api();
          }),
          r.each(l, function (t, e) {
            r.fn.DataTable[t] = e;
          }),
          (e.default = l);
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var i = (e[r] = { exports: {} });
    return t[r].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (function () {
      "use strict";
      var t = n(991),
        e = n(8942);
      e.extend(!0, t.default.defaults, {
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row dt-row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        renderer: "bootstrap",
      }),
        e.extend(t.default.ext.classes, {
          sWrapper: "dataTables_wrapper dt-bootstrap5",
          sFilterInput: "form-control form-control-sm",
          sLengthSelect: "form-select form-select-sm",
          sProcessing: "dataTables_processing card",
          sPageButton: "paginate_button page-item",
        }),
        (t.default.ext.renderer.pageButton.bootstrap = function (
          n,
          r,
          o,
          i,
          a,
          s
        ) {
          var l,
            c,
            u,
            d = new t.default.Api(n),
            f = n.oClasses,
            p = n.oLanguage.oPaginate,
            h = n.oLanguage.oAria.paginate || {},
            m = function (t, r) {
              var i,
                u,
                g,
                v,
                b = function (t) {
                  t.preventDefault(),
                    e(t.currentTarget).hasClass("disabled") ||
                      d.page() == t.data.action ||
                      d.page(t.data.action).draw("page");
                };
              for (i = 0, u = r.length; i < u; i++)
                if (((v = r[i]), Array.isArray(v))) m(t, v);
                else {
                  switch (((l = ""), (c = ""), v)) {
                    case "ellipsis":
                      (l = "&#x2026;"), (c = "disabled");
                      break;
                    case "first":
                      (l = p.sFirst), (c = v + (a > 0 ? "" : " disabled"));
                      break;
                    case "previous":
                      (l = p.sPrevious), (c = v + (a > 0 ? "" : " disabled"));
                      break;
                    case "next":
                      (l = p.sNext), (c = v + (a < s - 1 ? "" : " disabled"));
                      break;
                    case "last":
                      (l = p.sLast), (c = v + (a < s - 1 ? "" : " disabled"));
                      break;
                    default:
                      (l = v + 1), (c = a === v ? "active" : "");
                  }
                  if (l) {
                    var y = -1 !== c.indexOf("disabled");
                    (g = e("<li>", {
                      class: f.sPageButton + " " + c,
                      id:
                        0 === o && "string" == typeof v
                          ? n.sTableId + "_" + v
                          : null,
                    })
                      .append(
                        e("<a>", {
                          href: y ? null : "#",
                          "aria-controls": n.sTableId,
                          "aria-disabled": y ? "true" : null,
                          "aria-label": h[v],
                          "aria-role": "link",
                          "aria-current": "active" === c ? "page" : null,
                          "data-dt-idx": v,
                          tabindex: n.iTabIndex,
                          class: "page-link",
                        }).html(l)
                      )
                      .appendTo(t)),
                      n.oApi._fnBindAction(g, { action: v }, b);
                  }
                }
            },
            g = e(r);
          try {
            u = g.find(document.activeElement).data("dt-idx");
          } catch (t) {}
          var v = g.children("ul.pagination");
          v.length
            ? v.empty()
            : (v = g.html("<ul/>").children("ul").addClass("pagination")),
            m(v, i),
            void 0 !== u && g.find("[data-dt-idx=" + u + "]").trigger("focus");
        });
      var r = t.default;
      n(8336), n(5253), n(7480);
      e.extend(!0, r.Buttons.defaults, {
        dom: {
          container: { className: "dt-buttons btn-group flex-wrap" },
          button: { className: "btn btn-secondary" },
          collection: {
            tag: "div",
            className: "dropdown-menu",
            closeButton: !1,
            button: {
              tag: "a",
              className: "dt-button dropdown-item",
              active: "active",
              disabled: "disabled",
            },
          },
          splitWrapper: {
            tag: "div",
            className: "dt-btn-split-wrapper btn-group",
            closeButton: !1,
          },
          splitDropdown: {
            tag: "button",
            text: "",
            className:
              "btn btn-secondary dt-btn-split-drop dropdown-toggle dropdown-toggle-split",
            closeButton: !1,
            align: "split-left",
            splitAlignClass: "dt-button-split-left",
          },
          splitDropdownButton: {
            tag: "button",
            className: "dt-btn-split-drop-button btn btn-secondary",
            closeButton: !1,
          },
        },
        buttonCreated: function (t, n) {
          return t.buttons ? e('<div class="btn-group"/>').append(n) : n;
        },
      }),
        (r.ext.buttons.collection.className += " dropdown-toggle"),
        (r.ext.buttons.collection.rightAlignClassName = "dropdown-menu-right");
      var o = function (n, r) {
        if (!t.default.versionCheck || !t.default.versionCheck("1.10.10"))
          throw "DataTables Responsive requires DataTables 1.10.10 or newer";
        (this.s = {
          childNodeStore: {},
          columns: [],
          current: [],
          dt: new t.default.Api(n),
        }),
          this.s.dt.settings()[0].responsive ||
            (r && "string" == typeof r.details
              ? (r.details = { type: r.details })
              : r && !1 === r.details
              ? (r.details = { type: !1 })
              : r && !0 === r.details && (r.details = { type: "inline" }),
            (this.c = e.extend(
              !0,
              {},
              o.defaults,
              t.default.defaults.responsive,
              r
            )),
            (n.responsive = this),
            this._constructor());
      };
      e.extend(o.prototype, {
        _constructor: function () {
          var n = this,
            r = this.s.dt,
            o = r.settings()[0],
            i = e(window).innerWidth();
          (r.settings()[0]._responsive = this),
            e(window).on(
              "resize.dtr orientationchange.dtr",
              t.default.util.throttle(function () {
                var t = e(window).innerWidth();
                t !== i && (n._resize(), (i = t));
              })
            ),
            o.oApi._fnCallbackReg(
              o,
              "aoRowCreatedCallback",
              function (t, o, i) {
                -1 !== e.inArray(!1, n.s.current) &&
                  e(">td, >th", t).each(function (t) {
                    var o = r.column.index("toData", t);
                    !1 === n.s.current[o] && e(this).css("display", "none");
                  });
              }
            ),
            r.on("destroy.dtr", function () {
              r.off(".dtr"),
                e(r.table().body()).off(".dtr"),
                e(window).off("resize.dtr orientationchange.dtr"),
                r
                  .cells(".dtr-control")
                  .nodes()
                  .to$()
                  .removeClass("dtr-control"),
                e.each(n.s.current, function (t, e) {
                  !1 === e && n._setColumnVis(t, !0);
                });
            }),
            this.c.breakpoints.sort(function (t, e) {
              return t.width < e.width ? 1 : t.width > e.width ? -1 : 0;
            }),
            this._classLogic(),
            this._resizeAuto();
          var a = this.c.details;
          !1 !== a.type &&
            (n._detailsInit(),
            r.on("column-visibility.dtr", function () {
              n._timer && clearTimeout(n._timer),
                (n._timer = setTimeout(function () {
                  (n._timer = null),
                    n._classLogic(),
                    n._resizeAuto(),
                    n._resize(!0),
                    n._redrawChildren();
                }, 100));
            }),
            r.on("draw.dtr", function () {
              n._redrawChildren();
            }),
            e(r.table().node()).addClass("dtr-" + a.type)),
            r.on("column-reorder.dtr", function (t, e, r) {
              n._classLogic(), n._resizeAuto(), n._resize(!0);
            }),
            r.on("column-sizing.dtr", function () {
              n._resizeAuto(), n._resize();
            }),
            r.on("column-calc.dt", function (t, e) {
              for (var r = n.s.current, o = 0; o < r.length; o++) {
                var i = e.visible.indexOf(o);
                !1 === r[o] && i >= 0 && e.visible.splice(i, 1);
              }
            }),
            r.on("preXhr.dtr", function () {
              var t = [];
              r.rows().every(function () {
                this.child.isShown() && t.push(this.id(!0));
              }),
                r.one("draw.dtr", function () {
                  n._resizeAuto(),
                    n._resize(),
                    r.rows(t).every(function () {
                      n._detailsDisplay(this, !1);
                    });
                });
            }),
            r
              .on("draw.dtr", function () {
                n._controlClass();
              })
              .on("init.dtr", function (t, o, i) {
                "dt" === t.namespace &&
                  (n._resizeAuto(),
                  n._resize(),
                  e.inArray(!1, n.s.current) && r.columns.adjust());
              }),
            this._resize();
        },
        _childNodes: function (t, e, n) {
          var r = e + "-" + n;
          if (this.s.childNodeStore[r]) return this.s.childNodeStore[r];
          for (
            var o = [], i = t.cell(e, n).node().childNodes, a = 0, s = i.length;
            a < s;
            a++
          )
            o.push(i[a]);
          return (this.s.childNodeStore[r] = o), o;
        },
        _childNodesRestore: function (t, e, n) {
          var r = e + "-" + n;
          if (this.s.childNodeStore[r]) {
            for (
              var o = t.cell(e, n).node(),
                i = this.s.childNodeStore[r][0].parentNode.childNodes,
                a = [],
                s = 0,
                l = i.length;
              s < l;
              s++
            )
              a.push(i[s]);
            for (var c = 0, u = a.length; c < u; c++) o.appendChild(a[c]);
            this.s.childNodeStore[r] = void 0;
          }
        },
        _columnsVisiblity: function (t) {
          var n,
            r,
            o = this.s.dt,
            i = this.s.columns,
            a = i
              .map(function (t, e) {
                return { columnIdx: e, priority: t.priority };
              })
              .sort(function (t, e) {
                return t.priority !== e.priority
                  ? t.priority - e.priority
                  : t.columnIdx - e.columnIdx;
              }),
            s = e.map(i, function (n, r) {
              return !1 === o.column(r).visible()
                ? "not-visible"
                : (!n.auto || null !== n.minWidth) &&
                    (!0 === n.auto ? "-" : -1 !== e.inArray(t, n.includeIn));
            }),
            l = 0;
          for (n = 0, r = s.length; n < r; n++)
            !0 === s[n] && (l += i[n].minWidth);
          var c = o.settings()[0].oScroll,
            u = c.sY || c.sX ? c.iBarWidth : 0,
            d = o.table().container().offsetWidth - u - l;
          for (n = 0, r = s.length; n < r; n++)
            i[n].control && (d -= i[n].minWidth);
          var f = !1;
          for (n = 0, r = a.length; n < r; n++) {
            var p = a[n].columnIdx;
            "-" === s[p] &&
              !i[p].control &&
              i[p].minWidth &&
              (f || d - i[p].minWidth < 0
                ? ((f = !0), (s[p] = !1))
                : (s[p] = !0),
              (d -= i[p].minWidth));
          }
          var h = !1;
          for (n = 0, r = i.length; n < r; n++)
            if (!i[n].control && !i[n].never && !1 === s[n]) {
              h = !0;
              break;
            }
          for (n = 0, r = i.length; n < r; n++)
            i[n].control && (s[n] = h), "not-visible" === s[n] && (s[n] = !1);
          return -1 === e.inArray(!0, s) && (s[0] = !0), s;
        },
        _classLogic: function () {
          var t = this,
            n = this.c.breakpoints,
            r = this.s.dt,
            o = r
              .columns()
              .eq(0)
              .map(function (t) {
                var e = this.column(t),
                  n = e.header().className,
                  o = r.settings()[0].aoColumns[t].responsivePriority,
                  i = e.header().getAttribute("data-priority");
                return (
                  void 0 === o && (o = null == i ? 1e4 : 1 * i),
                  {
                    className: n,
                    includeIn: [],
                    auto: !1,
                    control: !1,
                    never: !!n.match(/\b(dtr\-)?never\b/),
                    priority: o,
                  }
                );
              }),
            i = function (t, n) {
              var r = o[t].includeIn;
              -1 === e.inArray(n, r) && r.push(n);
            },
            a = function (e, r, a, s) {
              var l, c, u;
              if (a) {
                if ("max-" === a)
                  for (l = t._find(r).width, c = 0, u = n.length; c < u; c++)
                    n[c].width <= l && i(e, n[c].name);
                else if ("min-" === a)
                  for (l = t._find(r).width, c = 0, u = n.length; c < u; c++)
                    n[c].width >= l && i(e, n[c].name);
                else if ("not-" === a)
                  for (c = 0, u = n.length; c < u; c++)
                    -1 === n[c].name.indexOf(s) && i(e, n[c].name);
              } else o[e].includeIn.push(r);
            };
          o.each(function (t, r) {
            for (
              var o = t.className.split(" "), i = !1, s = 0, l = o.length;
              s < l;
              s++
            ) {
              var c = o[s].trim();
              if ("all" === c || "dtr-all" === c)
                return (
                  (i = !0),
                  void (t.includeIn = e.map(n, function (t) {
                    return t.name;
                  }))
                );
              if ("none" === c || "dtr-none" === c || t.never)
                return void (i = !0);
              if ("control" === c || "dtr-control" === c)
                return (i = !0), void (t.control = !0);
              e.each(n, function (t, e) {
                var n = e.name.split("-"),
                  o = new RegExp(
                    "(min\\-|max\\-|not\\-)?(" + n[0] + ")(\\-[_a-zA-Z0-9])?"
                  ),
                  s = c.match(o);
                s &&
                  ((i = !0),
                  s[2] === n[0] && s[3] === "-" + n[1]
                    ? a(r, e.name, s[1], s[2] + s[3])
                    : s[2] !== n[0] || s[3] || a(r, e.name, s[1], s[2]));
              });
            }
            i || (t.auto = !0);
          }),
            (this.s.columns = o);
        },
        _controlClass: function () {
          if ("inline" === this.c.details.type) {
            var t = this.s.dt,
              n = this.s.current,
              r = e.inArray(!0, n);
            t
              .cells(
                null,
                function (t) {
                  return t !== r;
                },
                { page: "current" }
              )
              .nodes()
              .to$()
              .filter(".dtr-control")
              .removeClass("dtr-control"),
              t
                .cells(null, r, { page: "current" })
                .nodes()
                .to$()
                .addClass("dtr-control");
          }
        },
        _detailsDisplay: function (t, n) {
          var r = this,
            i = this.s.dt,
            a = this.c.details;
          if (a && !1 !== a.type) {
            var s =
                "string" == typeof a.renderer
                  ? o.renderer[a.renderer]()
                  : a.renderer,
              l = a.display(t, n, function () {
                return s.call(r, i, t[0], r._detailsObj(t[0]));
              });
            (!0 !== l && !1 !== l) ||
              e(i.table().node()).triggerHandler("responsive-display.dt", [
                i,
                t,
                l,
                n,
              ]);
          }
        },
        _detailsInit: function () {
          var t = this,
            n = this.s.dt,
            r = this.c.details;
          "inline" === r.type && (r.target = "td.dtr-control, th.dtr-control"),
            n.on("draw.dtr", function () {
              t._tabIndexes();
            }),
            t._tabIndexes(),
            e(n.table().body()).on("keyup.dtr", "td, th", function (t) {
              13 === t.keyCode &&
                e(this).data("dtr-keyboard") &&
                e(this).click();
            });
          var o = r.target,
            i = "string" == typeof o ? o : "td, th";
          (void 0 === o && null === o) ||
            e(n.table().body()).on(
              "click.dtr mousedown.dtr mouseup.dtr",
              i,
              function (r) {
                if (
                  e(n.table().node()).hasClass("collapsed") &&
                  -1 !==
                    e.inArray(
                      e(this).closest("tr").get(0),
                      n.rows().nodes().toArray()
                    )
                ) {
                  if ("number" == typeof o) {
                    var i = o < 0 ? n.columns().eq(0).length + o : o;
                    if (n.cell(this).index().column !== i) return;
                  }
                  var a = n.row(e(this).closest("tr"));
                  "click" === r.type
                    ? t._detailsDisplay(a, !1)
                    : "mousedown" === r.type
                    ? e(this).css("outline", "none")
                    : "mouseup" === r.type &&
                      e(this).trigger("blur").css("outline", "");
                }
              }
            );
        },
        _detailsObj: function (t) {
          var n = this,
            r = this.s.dt;
          return e.map(this.s.columns, function (o, i) {
            if (!o.never && !o.control) {
              var a = r.settings()[0].aoColumns[i];
              return {
                className: a.sClass,
                columnIndex: i,
                data: r.cell(t, i).render(n.c.orthogonal),
                hidden: r.column(i).visible() && !n.s.current[i],
                rowIndex: t,
                title:
                  null !== a.sTitle ? a.sTitle : e(r.column(i).header()).text(),
              };
            }
          });
        },
        _find: function (t) {
          for (var e = this.c.breakpoints, n = 0, r = e.length; n < r; n++)
            if (e[n].name === t) return e[n];
        },
        _redrawChildren: function () {
          var t = this,
            e = this.s.dt;
          e.rows({ page: "current" }).iterator("row", function (n, r) {
            e.row(r);
            t._detailsDisplay(e.row(r), !0);
          });
        },
        _resize: function (t) {
          var n,
            r,
            o = this,
            i = this.s.dt,
            a = e(window).innerWidth(),
            s = this.c.breakpoints,
            l = s[0].name,
            c = this.s.columns,
            u = this.s.current.slice();
          for (n = s.length - 1; n >= 0; n--)
            if (a <= s[n].width) {
              l = s[n].name;
              break;
            }
          var d = this._columnsVisiblity(l);
          this.s.current = d;
          var f = !1;
          for (n = 0, r = c.length; n < r; n++)
            if (
              !1 === d[n] &&
              !c[n].never &&
              !c[n].control &&
              !1 == !i.column(n).visible()
            ) {
              f = !0;
              break;
            }
          e(i.table().node()).toggleClass("collapsed", f);
          var p = !1,
            h = 0;
          i
            .columns()
            .eq(0)
            .each(function (e, n) {
              !0 === d[n] && h++,
                (t || d[n] !== u[n]) && ((p = !0), o._setColumnVis(e, d[n]));
            }),
            this._redrawChildren(),
            p &&
              (e(i.table().node()).trigger("responsive-resize.dt", [
                i,
                this.s.current,
              ]),
              0 === i.page.info().recordsDisplay &&
                e("td", i.table().body()).eq(0).attr("colspan", h)),
            o._controlClass();
        },
        _resizeAuto: function () {
          var t = this.s.dt,
            n = this.s.columns,
            r = this;
          if (
            this.c.auto &&
            -1 !==
              e.inArray(
                !0,
                e.map(n, function (t) {
                  return t.auto;
                })
              )
          ) {
            e.isEmptyObject(this.s.childNodeStore) ||
              e.each(this.s.childNodeStore, function (e) {
                var n = e.split("-");
                r._childNodesRestore(t, 1 * n[0], 1 * n[1]);
              });
            t.table().node().offsetWidth, t.columns;
            var o = t.table().node().cloneNode(!1),
              i = e(t.table().header().cloneNode(!1)).appendTo(o),
              a = e(t.table().body()).clone(!1, !1).empty().appendTo(o);
            o.style.width = "auto";
            var s = t
              .columns()
              .header()
              .filter(function (e) {
                return t.column(e).visible();
              })
              .to$()
              .clone(!1)
              .css("display", "table-cell")
              .css("width", "auto")
              .css("min-width", 0);
            e(a)
              .append(e(t.rows({ page: "current" }).nodes()).clone(!1))
              .find("th, td")
              .css("display", "");
            var l = t.table().footer();
            if (l) {
              var c = e(l.cloneNode(!1)).appendTo(o),
                u = t
                  .columns()
                  .footer()
                  .filter(function (e) {
                    return t.column(e).visible();
                  })
                  .to$()
                  .clone(!1)
                  .css("display", "table-cell");
              e("<tr/>").append(u).appendTo(c);
            }
            e("<tr/>").append(s).appendTo(i),
              "inline" === this.c.details.type &&
                e(o).addClass("dtr-inline collapsed"),
              e(o).find("[name]").removeAttr("name"),
              e(o).css("position", "relative");
            var d = e("<div/>")
              .css({ width: 1, height: 1, overflow: "hidden", clear: "both" })
              .append(o);
            d.insertBefore(t.table().node()),
              s.each(function (e) {
                var r = t.column.index("fromVisible", e);
                n[r].minWidth = this.offsetWidth || 0;
              }),
              d.remove();
          }
        },
        _responsiveOnlyHidden: function () {
          var t = this.s.dt;
          return e.map(this.s.current, function (e, n) {
            return !1 === t.column(n).visible() || e;
          });
        },
        _setColumnVis: function (t, n) {
          var r = this,
            o = this.s.dt,
            i = n ? "" : "none";
          e(o.column(t).header())
            .css("display", i)
            .toggleClass("dtr-hidden", !n),
            e(o.column(t).footer())
              .css("display", i)
              .toggleClass("dtr-hidden", !n),
            o
              .column(t)
              .nodes()
              .to$()
              .css("display", i)
              .toggleClass("dtr-hidden", !n),
            e.isEmptyObject(this.s.childNodeStore) ||
              o
                .cells(null, t)
                .indexes()
                .each(function (t) {
                  r._childNodesRestore(o, t.row, t.column);
                });
        },
        _tabIndexes: function () {
          var t = this.s.dt,
            n = t.cells({ page: "current" }).nodes().to$(),
            r = t.settings()[0],
            o = this.c.details.target;
          n.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),
            "number" == typeof o
              ? t
                  .cells(null, o, { page: "current" })
                  .nodes()
                  .to$()
                  .attr("tabIndex", r.iTabIndex)
                  .data("dtr-keyboard", 1)
              : ("td:first-child, th:first-child" === o &&
                  (o = ">td:first-child, >th:first-child"),
                e(o, t.rows({ page: "current" }).nodes())
                  .attr("tabIndex", r.iTabIndex)
                  .data("dtr-keyboard", 1));
        },
      }),
        (o.breakpoints = [
          { name: "desktop", width: 1 / 0 },
          { name: "tablet-l", width: 1024 },
          { name: "tablet-p", width: 768 },
          { name: "mobile-l", width: 480 },
          { name: "mobile-p", width: 320 },
        ]),
        (o.display = {
          childRow: function (t, n, r) {
            return n
              ? e(t.node()).hasClass("parent")
                ? (t.child(r(), "child").show(), !0)
                : void 0
              : t.child.isShown()
              ? (t.child(!1), e(t.node()).removeClass("parent"), !1)
              : (t.child(r(), "child").show(),
                e(t.node()).addClass("parent"),
                !0);
          },
          childRowImmediate: function (t, n, r) {
            return (!n && t.child.isShown()) || !t.responsive.hasHidden()
              ? (t.child(!1), e(t.node()).removeClass("parent"), !1)
              : (t.child(r(), "child").show(),
                e(t.node()).addClass("parent"),
                !0);
          },
          modal: function (t) {
            return function (n, r, o) {
              if (r) e("div.dtr-modal-content").empty().append(o());
              else {
                var i = function () {
                    a.remove(), e(document).off("keypress.dtr");
                  },
                  a = e('<div class="dtr-modal"/>')
                    .append(
                      e('<div class="dtr-modal-display"/>')
                        .append(
                          e('<div class="dtr-modal-content"/>').append(o())
                        )
                        .append(
                          e('<div class="dtr-modal-close">&times;</div>').click(
                            function () {
                              i();
                            }
                          )
                        )
                    )
                    .append(
                      e('<div class="dtr-modal-background"/>').click(
                        function () {
                          i();
                        }
                      )
                    )
                    .appendTo("body");
                e(document).on("keyup.dtr", function (t) {
                  27 === t.keyCode && (t.stopPropagation(), i());
                });
              }
              t &&
                t.header &&
                e("div.dtr-modal-content").prepend(
                  "<h2>" + t.header(n) + "</h2>"
                );
            };
          },
        }),
        (o.renderer = {
          listHiddenNodes: function () {
            return function (t, n, r) {
              var o = this,
                i = e('<ul data-dtr-index="' + n + '" class="dtr-details"/>'),
                a = !1;
              e.each(r, function (n, r) {
                if (r.hidden) {
                  var s = r.className ? 'class="' + r.className + '"' : "";
                  e(
                    "<li " +
                      s +
                      ' data-dtr-index="' +
                      r.columnIndex +
                      '" data-dt-row="' +
                      r.rowIndex +
                      '" data-dt-column="' +
                      r.columnIndex +
                      '"><span class="dtr-title">' +
                      r.title +
                      "</span> </li>"
                  )
                    .append(
                      e('<span class="dtr-data"/>').append(
                        o._childNodes(t, r.rowIndex, r.columnIndex)
                      )
                    )
                    .appendTo(i),
                    (a = !0);
                }
              });
              return !!a && i;
            };
          },
          listHidden: function () {
            return function (t, n, r) {
              var o = e
                .map(r, function (t) {
                  var e = t.className ? 'class="' + t.className + '"' : "";
                  return t.hidden
                    ? "<li " +
                        e +
                        ' data-dtr-index="' +
                        t.columnIndex +
                        '" data-dt-row="' +
                        t.rowIndex +
                        '" data-dt-column="' +
                        t.columnIndex +
                        '"><span class="dtr-title">' +
                        t.title +
                        '</span> <span class="dtr-data">' +
                        t.data +
                        "</span></li>"
                    : "";
                })
                .join("");
              return (
                !!o &&
                e(
                  '<ul data-dtr-index="' + n + '" class="dtr-details"/>'
                ).append(o)
              );
            };
          },
          tableAll: function (t) {
            return (
              (t = e.extend({ tableClass: "" }, t)),
              function (n, r, o) {
                var i = e
                  .map(o, function (t) {
                    return (
                      "<tr " +
                      (t.className ? 'class="' + t.className + '"' : "") +
                      ' data-dt-row="' +
                      t.rowIndex +
                      '" data-dt-column="' +
                      t.columnIndex +
                      '"><td>' +
                      t.title +
                      ":</td> <td>" +
                      t.data +
                      "</td></tr>"
                    );
                  })
                  .join("");
                return e(
                  '<table class="' +
                    t.tableClass +
                    ' dtr-details" width="100%"/>'
                ).append(i);
              }
            );
          },
        }),
        (o.defaults = {
          breakpoints: o.breakpoints,
          auto: !0,
          details: {
            display: o.display.childRow,
            renderer: o.renderer.listHidden(),
            target: 0,
            type: "inline",
          },
          orthogonal: "display",
        });
      var i = e.fn.dataTable.Api;
      i.register("responsive()", function () {
        return this;
      }),
        i.register("responsive.index()", function (t) {
          return {
            column: (t = e(t)).data("dtr-index"),
            row: t.parent().data("dtr-index"),
          };
        }),
        i.register("responsive.rebuild()", function () {
          return this.iterator("table", function (t) {
            t._responsive && t._responsive._classLogic();
          });
        }),
        i.register("responsive.recalc()", function () {
          return this.iterator("table", function (t) {
            t._responsive &&
              (t._responsive._resizeAuto(), t._responsive._resize());
          });
        }),
        i.register("responsive.hasHidden()", function () {
          var t = this.context[0];
          return (
            !!t._responsive &&
            -1 !== e.inArray(!1, t._responsive._responsiveOnlyHidden())
          );
        }),
        i.registerPlural(
          "columns().responsiveHidden()",
          "column().responsiveHidden()",
          function () {
            return this.iterator(
              "column",
              function (t, e) {
                return (
                  !!t._responsive && t._responsive._responsiveOnlyHidden()[e]
                );
              },
              1
            );
          }
        ),
        (o.version = "2.4.1"),
        (e.fn.dataTable.Responsive = o),
        (e.fn.DataTable.Responsive = o),
        e(document).on("preInit.dt.dtr", function (n, r, i) {
          if (
            "dt" === n.namespace &&
            (e(r.nTable).hasClass("responsive") ||
              e(r.nTable).hasClass("dt-responsive") ||
              r.oInit.responsive ||
              t.default.defaults.responsive)
          ) {
            var a = r.oInit.responsive;
            !1 !== a && new o(r, e.isPlainObject(a) ? a : {});
          }
        });
      function a(t, e, n) {
        var r,
          o,
          i,
          a = function (e, n) {
            if (e > n) {
              var r = n;
              (n = e), (e = r);
            }
            var o = !1;
            return t
              .columns(":visible")
              .indexes()
              .filter(function (t) {
                return t === e && (o = !0), t === n ? ((o = !1), !0) : o;
              });
          },
          s = function (e, n) {
            var r = t.rows({ search: "applied" }).indexes();
            if (r.indexOf(e) > r.indexOf(n)) {
              var o = n;
              (n = e), (e = o);
            }
            var i = !1;
            return r.filter(function (t) {
              return t === e && (i = !0), t === n ? ((i = !1), !0) : i;
            });
          };
        t.cells({ selected: !0 }).any() || n
          ? ((o = a(n.column, e.column)), (i = s(n.row, e.row)))
          : ((o = a(0, e.column)), (i = s(0, e.row))),
          (r = t.cells(i, o).flatten()),
          t.cells(e, { selected: !0 }).any()
            ? t.cells(r).deselect()
            : t.cells(r).select();
      }
      function s(t) {
        var n = t.settings()[0]._select.selector;
        e(t.table().container())
          .off("mousedown.dtSelect", n)
          .off("mouseup.dtSelect", n)
          .off("click.dtSelect", n),
          e("body").off("click.dtSelect" + h(t.table().node()));
      }
      function l(t) {
        var n,
          r = e(t.table().container()),
          o = t.settings()[0],
          i = o._select.selector;
        r
          .on("mousedown.dtSelect", i, function (t) {
            (t.shiftKey || t.metaKey || t.ctrlKey) &&
              r
                .css("-moz-user-select", "none")
                .one("selectstart.dtSelect", i, function () {
                  return !1;
                }),
              window.getSelection && (n = window.getSelection());
          })
          .on("mouseup.dtSelect", i, function () {
            r.css("-moz-user-select", "");
          })
          .on("click.dtSelect", i, function (r) {
            var o,
              i = t.select.items();
            if (n) {
              var a = window.getSelection();
              if (
                (!a.anchorNode ||
                  e(a.anchorNode).closest("table")[0] === t.table().node()) &&
                a !== n
              )
                return;
            }
            var s = t.settings()[0],
              l = t.settings()[0].oClasses.sWrapper.trim().replace(/ +/g, ".");
            if (e(r.target).closest("div." + l)[0] == t.table().container()) {
              var u = t.cell(e(r.target).closest("td, th"));
              if (u.any()) {
                var d = e.Event("user-select.dt");
                if ((c(t, d, [i, u, r]), !d.isDefaultPrevented())) {
                  var f = u.index();
                  "row" === i
                    ? ((o = f.row), p(r, t, s, "row", o))
                    : "column" === i
                    ? ((o = u.index().column), p(r, t, s, "column", o))
                    : "cell" === i && ((o = u.index()), p(r, t, s, "cell", o)),
                    (s._select_lastCell = f);
                }
              }
            }
          }),
          e("body").on("click.dtSelect" + h(t.table().node()), function (n) {
            if (o._select.blurable) {
              if (e(n.target).parents().filter(t.table().container()).length)
                return;
              if (0 === e(n.target).parents("html").length) return;
              if (e(n.target).parents("div.DTE").length) return;
              var r = e.Event("select-blur.dt");
              if ((c(t, r, [n.target, n]), r.isDefaultPrevented())) return;
              f(o, !0);
            }
          });
      }
      function c(t, n, r, o) {
        (o && !t.flatten().length) ||
          ("string" == typeof n && (n += ".dt"),
          r.unshift(t),
          e(t.table().node()).trigger(n, r));
      }
      function u(n) {
        var r = new t.default.Api(n);
        (n._select_init = !0),
          n.aoRowCreatedCallback.push({
            fn: function (t, r, o) {
              var i,
                a,
                s = n.aoData[o];
              for (
                s._select_selected && e(t).addClass(n._select.className),
                  i = 0,
                  a = n.aoColumns.length;
                i < a;
                i++
              )
                (n.aoColumns[i]._select_selected ||
                  (s._selected_cells && s._selected_cells[i])) &&
                  e(s.anCells[i]).addClass(n._select.className);
            },
            sName: "select-deferRender",
          }),
          r.on("preXhr.dt.dtSelect", function (t, e) {
            if (e === r.settings()[0]) {
              var n = r
                  .rows({ selected: !0 })
                  .ids(!0)
                  .filter(function (t) {
                    return void 0 !== t;
                  }),
                o = r
                  .cells({ selected: !0 })
                  .eq(0)
                  .map(function (t) {
                    var e = r.row(t.row).id(!0);
                    return e ? { row: e, column: t.column } : void 0;
                  })
                  .filter(function (t) {
                    return void 0 !== t;
                  });
              r.one("draw.dt.dtSelect", function () {
                r.rows(n).select(),
                  o.any() &&
                    o.each(function (t) {
                      r.cells(t.row, t.column).select();
                    });
              });
            }
          }),
          r.on(
            "draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt",
            function () {
              !(function (t) {
                var n = t.settings()[0];
                if (
                  n._select.info &&
                  n.aanFeatures.i &&
                  "api" !== t.select.style()
                ) {
                  var r = t.rows({ selected: !0 }).flatten().length,
                    o = t.columns({ selected: !0 }).flatten().length,
                    i = t.cells({ selected: !0 }).flatten().length,
                    a = function (n, r, o) {
                      n.append(
                        e('<span class="select-item"/>').append(
                          t.i18n(
                            "select." + r + "s",
                            {
                              _: "%d " + r + "s selected",
                              0: "",
                              1: "1 " + r + " selected",
                            },
                            o
                          )
                        )
                      );
                    };
                  e.each(n.aanFeatures.i, function (t, n) {
                    n = e(n);
                    var s = e('<span class="select-info"/>');
                    a(s, "row", r), a(s, "column", o), a(s, "cell", i);
                    var l = n.children("span.select-info");
                    l.length && l.remove(), "" !== s.text() && n.append(s);
                  });
                }
              })(r),
                r.state.save();
            }
          ),
          r.on("destroy.dtSelect", function () {
            e(r.rows({ selected: !0 }).nodes()).removeClass(
              r.settings()[0]._select.className
            ),
              s(r),
              r.off(".dtSelect"),
              e("body").off(".dtSelect" + h(r.table().node()));
          });
      }
      function d(t, n, r, o) {
        var i = t[n + "s"]({ search: "applied" }).indexes(),
          a = e.inArray(o, i),
          s = e.inArray(r, i);
        if (t[n + "s"]({ selected: !0 }).any() || -1 !== a) {
          if (a > s) {
            var l = s;
            (s = a), (a = l);
          }
          i.splice(s + 1, i.length), i.splice(0, a);
        } else i.splice(e.inArray(r, i) + 1, i.length);
        t[n](r, { selected: !0 }).any()
          ? (i.splice(e.inArray(r, i), 1), t[n + "s"](i).deselect())
          : t[n + "s"](i).select();
      }
      function f(e, n) {
        if (n || "single" === e._select.style) {
          var r = new t.default.Api(e);
          r.rows({ selected: !0 }).deselect(),
            r.columns({ selected: !0 }).deselect(),
            r.cells({ selected: !0 }).deselect();
        }
      }
      function p(t, e, n, r, o) {
        var i = e.select.style(),
          s = e.select.toggleable(),
          l = e[r](o, { selected: !0 }).any();
        if (!l || s)
          if ("os" === i)
            if (t.ctrlKey || t.metaKey) e[r](o).select(!l);
            else if (t.shiftKey)
              "cell" === r
                ? a(e, o, n._select_lastCell || null)
                : d(e, r, o, n._select_lastCell ? n._select_lastCell[r] : null);
            else {
              var c = e[r + "s"]({ selected: !0 });
              l && 1 === c.flatten().length
                ? e[r](o).deselect()
                : (c.deselect(), e[r](o).select());
            }
          else
            "multi+shift" == i && t.shiftKey
              ? "cell" === r
                ? a(e, o, n._select_lastCell || null)
                : d(e, r, o, n._select_lastCell ? n._select_lastCell[r] : null)
              : e[r](o).select(!l);
      }
      function h(t) {
        return t.id.replace(/[^a-zA-Z0-9\-\_]/g, "-");
      }
      (t.default.select = {}),
        (t.default.select.version = "1.6.2"),
        (t.default.select.init = function (n) {
          var r = n.settings()[0];
          if (!r._select) {
            var o = n.state.loaded(),
              i = function (t, e, r) {
                if (null !== r && void 0 !== r.select) {
                  if (
                    (n.rows({ selected: !0 }).any() && n.rows().deselect(),
                    void 0 !== r.select.rows && n.rows(r.select.rows).select(),
                    n.columns({ selected: !0 }).any() && n.columns().deselect(),
                    void 0 !== r.select.columns &&
                      n.columns(r.select.columns).select(),
                    n.cells({ selected: !0 }).any() && n.cells().deselect(),
                    void 0 !== r.select.cells)
                  )
                    for (var o = 0; o < r.select.cells.length; o++)
                      n.cell(
                        r.select.cells[o].row,
                        r.select.cells[o].column
                      ).select();
                  n.state.save();
                }
              };
            n.on("stateSaveParams", function (t, e, r) {
              (r.select = {}),
                (r.select.rows = n.rows({ selected: !0 }).ids(!0).toArray()),
                (r.select.columns = n.columns({ selected: !0 })[0]),
                (r.select.cells = n
                  .cells({ selected: !0 })[0]
                  .map(function (t) {
                    return { row: n.row(t.row).id(!0), column: t.column };
                  }));
            })
              .on("stateLoadParams", i)
              .one("init", function () {
                i(0, 0, o);
              });
            var a = r.oInit.select,
              s = t.default.defaults.select,
              l = void 0 === a ? s : a,
              c = "row",
              u = "api",
              d = !1,
              f = !0,
              p = !0,
              h = "td, th",
              m = "selected",
              g = !1;
            (r._select = {}),
              !0 === l
                ? ((u = "os"), (g = !0))
                : "string" == typeof l
                ? ((u = l), (g = !0))
                : e.isPlainObject(l) &&
                  (void 0 !== l.blurable && (d = l.blurable),
                  void 0 !== l.toggleable && (f = l.toggleable),
                  void 0 !== l.info && (p = l.info),
                  void 0 !== l.items && (c = l.items),
                  void 0 !== l.style
                    ? ((u = l.style), (g = !0))
                    : ((u = "os"), (g = !0)),
                  void 0 !== l.selector && (h = l.selector),
                  void 0 !== l.className && (m = l.className)),
              n.select.selector(h),
              n.select.items(c),
              n.select.style(u),
              n.select.blurable(d),
              n.select.toggleable(f),
              n.select.info(p),
              (r._select.className = m),
              (e.fn.dataTable.ext.order["select-checkbox"] = function (t, n) {
                return this.api()
                  .column(n, { order: "index" })
                  .nodes()
                  .map(function (n) {
                    return "row" === t._select.items
                      ? e(n).parent().hasClass(t._select.className)
                      : "cell" === t._select.items &&
                          e(n).hasClass(t._select.className);
                  });
              }),
              !g &&
                e(n.table().node()).hasClass("selectable") &&
                n.select.style("os");
          }
        }),
        e.each(
          [
            { type: "row", prop: "aoData" },
            { type: "column", prop: "aoColumns" },
          ],
          function (e, n) {
            t.default.ext.selector[n.type].push(function (t, e, r) {
              var o,
                i = e.selected,
                a = [];
              if (!0 !== i && !1 !== i) return r;
              for (var s = 0, l = r.length; s < l; s++)
                (o = t[n.prop][r[s]]),
                  ((!0 === i && !0 === o._select_selected) ||
                    (!1 === i && !o._select_selected)) &&
                    a.push(r[s]);
              return a;
            });
          }
        ),
        t.default.ext.selector.cell.push(function (t, e, n) {
          var r,
            o = e.selected,
            i = [];
          if (void 0 === o) return n;
          for (var a = 0, s = n.length; a < s; a++)
            (r = t.aoData[n[a].row]),
              ((!0 === o &&
                r._selected_cells &&
                !0 === r._selected_cells[n[a].column]) ||
                (!1 === o &&
                  (!r._selected_cells || !r._selected_cells[n[a].column]))) &&
                i.push(n[a]);
          return i;
        });
      var m = t.default.Api.register,
        g = t.default.Api.registerPlural;
      function v(t, e) {
        return function (n) {
          return n.i18n("buttons." + t, e);
        };
      }
      function b(t) {
        var e = t._eventNamespace;
        return "draw.dt.DT" + e + " select.dt.DT" + e + " deselect.dt.DT" + e;
      }
      m("select()", function () {
        return this.iterator("table", function (e) {
          t.default.select.init(new t.default.Api(e));
        });
      }),
        m("select.blurable()", function (t) {
          return void 0 === t
            ? this.context[0]._select.blurable
            : this.iterator("table", function (e) {
                e._select.blurable = t;
              });
        }),
        m("select.toggleable()", function (t) {
          return void 0 === t
            ? this.context[0]._select.toggleable
            : this.iterator("table", function (e) {
                e._select.toggleable = t;
              });
        }),
        m("select.info()", function (t) {
          return void 0 === t
            ? this.context[0]._select.info
            : this.iterator("table", function (e) {
                e._select.info = t;
              });
        }),
        m("select.items()", function (e) {
          return void 0 === e
            ? this.context[0]._select.items
            : this.iterator("table", function (n) {
                (n._select.items = e),
                  c(new t.default.Api(n), "selectItems", [e]);
              });
        }),
        m("select.style()", function (e) {
          return void 0 === e
            ? this.context[0]._select.style
            : this.iterator("table", function (n) {
                n._select || t.default.select.init(new t.default.Api(n)),
                  n._select_init || u(n),
                  (n._select.style = e);
                var r = new t.default.Api(n);
                s(r),
                  "api" !== e && l(r),
                  c(new t.default.Api(n), "selectStyle", [e]);
              });
        }),
        m("select.selector()", function (e) {
          return void 0 === e
            ? this.context[0]._select.selector
            : this.iterator("table", function (n) {
                s(new t.default.Api(n)),
                  (n._select.selector = e),
                  "api" !== n._select.style && l(new t.default.Api(n));
              });
        }),
        g("rows().select()", "row().select()", function (t) {
          var n = this;
          return !1 === t
            ? this.deselect()
            : (this.iterator("row", function (t, n) {
                f(t),
                  (t.aoData[n]._select_selected = !0),
                  e(t.aoData[n].nTr).addClass(t._select.className);
              }),
              this.iterator("table", function (t, e) {
                c(n, "select", ["row", n[e]], !0);
              }),
              this);
        }),
        m("row().selected()", function () {
          var t = this.context[0];
          return !!(
            t &&
            this.length &&
            t.aoData[this[0]] &&
            t.aoData[this[0]]._select_selected
          );
        }),
        g("columns().select()", "column().select()", function (n) {
          var r = this;
          return !1 === n
            ? this.deselect()
            : (this.iterator("column", function (n, r) {
                f(n), (n.aoColumns[r]._select_selected = !0);
                var o = new t.default.Api(n).column(r);
                e(o.header()).addClass(n._select.className),
                  e(o.footer()).addClass(n._select.className),
                  o.nodes().to$().addClass(n._select.className);
              }),
              this.iterator("table", function (t, e) {
                c(r, "select", ["column", r[e]], !0);
              }),
              this);
        }),
        m("column().selected()", function () {
          var t = this.context[0];
          return !!(
            t &&
            this.length &&
            t.aoColumns[this[0]] &&
            t.aoColumns[this[0]]._select_selected
          );
        }),
        g("cells().select()", "cell().select()", function (t) {
          var n = this;
          return !1 === t
            ? this.deselect()
            : (this.iterator("cell", function (t, n, r) {
                f(t);
                var o = t.aoData[n];
                void 0 === o._selected_cells && (o._selected_cells = []),
                  (o._selected_cells[r] = !0),
                  o.anCells && e(o.anCells[r]).addClass(t._select.className);
              }),
              this.iterator("table", function (t, e) {
                c(n, "select", ["cell", n.cells(n[e]).indexes().toArray()], !0);
              }),
              this);
        }),
        m("cell().selected()", function () {
          var t = this.context[0];
          if (t && this.length) {
            var e = t.aoData[this[0][0].row];
            if (e && e._selected_cells && e._selected_cells[this[0][0].column])
              return !0;
          }
          return !1;
        }),
        g("rows().deselect()", "row().deselect()", function () {
          var t = this;
          return (
            this.iterator("row", function (t, n) {
              (t.aoData[n]._select_selected = !1),
                (t._select_lastCell = null),
                e(t.aoData[n].nTr).removeClass(t._select.className);
            }),
            this.iterator("table", function (e, n) {
              c(t, "deselect", ["row", t[n]], !0);
            }),
            this
          );
        }),
        g("columns().deselect()", "column().deselect()", function () {
          var n = this;
          return (
            this.iterator("column", function (n, r) {
              n.aoColumns[r]._select_selected = !1;
              var o = new t.default.Api(n),
                i = o.column(r);
              e(i.header()).removeClass(n._select.className),
                e(i.footer()).removeClass(n._select.className),
                o
                  .cells(null, r)
                  .indexes()
                  .each(function (t) {
                    var r = n.aoData[t.row],
                      o = r._selected_cells;
                    !r.anCells ||
                      (o && o[t.column]) ||
                      e(r.anCells[t.column]).removeClass(n._select.className);
                  });
            }),
            this.iterator("table", function (t, e) {
              c(n, "deselect", ["column", n[e]], !0);
            }),
            this
          );
        }),
        g("cells().deselect()", "cell().deselect()", function () {
          var t = this;
          return (
            this.iterator("cell", function (t, n, r) {
              var o = t.aoData[n];
              void 0 !== o._selected_cells && (o._selected_cells[r] = !1),
                o.anCells &&
                  !t.aoColumns[r]._select_selected &&
                  e(o.anCells[r]).removeClass(t._select.className);
            }),
            this.iterator("table", function (e, n) {
              c(t, "deselect", ["cell", t[n]], !0);
            }),
            this
          );
        });
      var y = 0;
      e.extend(t.default.ext.buttons, {
        selected: {
          text: v("selected", "Selected"),
          className: "buttons-selected",
          limitTo: ["rows", "columns", "cells"],
          init: function (t, n, r) {
            var o = this;
            (r._eventNamespace = ".select" + y++),
              t.on(b(r), function () {
                o.enable(
                  (function (t, n) {
                    return (
                      !(
                        -1 === e.inArray("rows", n.limitTo) ||
                        !t.rows({ selected: !0 }).any()
                      ) ||
                      !(
                        -1 === e.inArray("columns", n.limitTo) ||
                        !t.columns({ selected: !0 }).any()
                      ) ||
                      !(
                        -1 === e.inArray("cells", n.limitTo) ||
                        !t.cells({ selected: !0 }).any()
                      )
                    );
                  })(t, r)
                );
              }),
              this.disable();
          },
          destroy: function (t, e, n) {
            t.off(n._eventNamespace);
          },
        },
        selectedSingle: {
          text: v("selectedSingle", "Selected single"),
          className: "buttons-selected-single",
          init: function (t, e, n) {
            var r = this;
            (n._eventNamespace = ".select" + y++),
              t.on(b(n), function () {
                var e =
                  t.rows({ selected: !0 }).flatten().length +
                  t.columns({ selected: !0 }).flatten().length +
                  t.cells({ selected: !0 }).flatten().length;
                r.enable(1 === e);
              }),
              this.disable();
          },
          destroy: function (t, e, n) {
            t.off(n._eventNamespace);
          },
        },
        selectAll: {
          text: v("selectAll", "Select all"),
          className: "buttons-select-all",
          action: function () {
            this[this.select.items() + "s"]().select();
          },
        },
        selectNone: {
          text: v("selectNone", "Deselect all"),
          className: "buttons-select-none",
          action: function () {
            f(this.settings()[0], !0);
          },
          init: function (t, e, n) {
            var r = this;
            (n._eventNamespace = ".select" + y++),
              t.on(b(n), function () {
                var e =
                  t.rows({ selected: !0 }).flatten().length +
                  t.columns({ selected: !0 }).flatten().length +
                  t.cells({ selected: !0 }).flatten().length;
                r.enable(e > 0);
              }),
              this.disable();
          },
          destroy: function (t, e, n) {
            t.off(n._eventNamespace);
          },
        },
        showSelected: {
          text: v("showSelected", "Show only selected"),
          className: "buttons-show-selected",
          action: function (e, n, r, o) {
            if (o._filter) {
              var i = t.default.ext.search.indexOf(o._filter);
              -1 !== i &&
                (t.default.ext.search.splice(i, 1), (o._filter = null)),
                this.active(!1);
            } else {
              var a = function (t, e, r) {
                if (t !== n.settings()[0]) return !0;
                return t.aoData[r]._select_selected;
              };
              (o._filter = a), t.default.ext.search.push(a), this.active(!0);
            }
            n.draw();
          },
        },
      }),
        e.each(["Row", "Column", "Cell"], function (e, n) {
          var r = n.toLowerCase();
          t.default.ext.buttons["select" + n + "s"] = {
            text: v("select" + n + "s", "Select " + r + "s"),
            className: "buttons-select-" + r + "s",
            action: function () {
              this.select.items(r);
            },
            init: function (t) {
              var e = this;
              t.on("selectItems.dt.DT", function (t, n, o) {
                e.active(o === r);
              });
            },
          };
        }),
        (e.fn.DataTable.select = t.default.select),
        e(document).on("preInit.dt.dtSelect", function (e, n) {
          "dt" === e.namespace && t.default.select.init(new t.default.Api(n));
        });
      var x = 0,
        w = function (n, r) {
          if (!(this instanceof w))
            throw "FixedHeader must be initialised with the 'new' keyword.";
          !0 === r && (r = {}),
            (n = new t.default.Api(n)),
            (this.c = e.extend(!0, {}, w.defaults, r)),
            (this.s = {
              dt: n,
              position: {
                theadTop: 0,
                tbodyTop: 0,
                tfootTop: 0,
                tfootBottom: 0,
                width: 0,
                left: 0,
                tfootHeight: 0,
                theadHeight: 0,
                windowHeight: e(window).height(),
                visible: !0,
              },
              headerMode: null,
              footerMode: null,
              autoWidth: n.settings()[0].oFeatures.bAutoWidth,
              namespace: ".dtfc" + x++,
              scrollLeft: { header: -1, footer: -1 },
              enable: !0,
            }),
            (this.dom = {
              floatingHeader: null,
              thead: e(n.table().header()),
              tbody: e(n.table().body()),
              tfoot: e(n.table().footer()),
              header: {
                host: null,
                floating: null,
                floatingParent: e('<div class="dtfh-floatingparent">'),
                placeholder: null,
              },
              footer: {
                host: null,
                floating: null,
                floatingParent: e('<div class="dtfh-floatingparent">'),
                placeholder: null,
              },
            }),
            (this.dom.header.host = this.dom.thead.parent()),
            (this.dom.footer.host = this.dom.tfoot.parent());
          var o = n.settings()[0];
          if (o._fixedHeader)
            throw "FixedHeader already initialised on table " + o.nTable.id;
          (o._fixedHeader = this), this._constructor();
        };
      e.extend(w.prototype, {
        destroy: function () {
          var t = this.dom;
          this.s.dt.off(".dtfc"),
            e(window).off(this.s.namespace),
            t.header.rightBlocker && t.header.rightBlocker.remove(),
            t.header.leftBlocker && t.header.leftBlocker.remove(),
            t.footer.rightBlocker && t.footer.rightBlocker.remove(),
            t.footer.leftBlocker && t.footer.leftBlocker.remove(),
            this.c.header && this._modeChange("in-place", "header", !0),
            this.c.footer &&
              t.tfoot.length &&
              this._modeChange("in-place", "footer", !0);
        },
        enable: function (t, e) {
          (this.s.enable = t),
            (e || void 0 === e) && (this._positions(), this._scroll(!0));
        },
        enabled: function () {
          return this.s.enable;
        },
        headerOffset: function (t) {
          return (
            void 0 !== t && ((this.c.headerOffset = t), this.update()),
            this.c.headerOffset
          );
        },
        footerOffset: function (t) {
          return (
            void 0 !== t && ((this.c.footerOffset = t), this.update()),
            this.c.footerOffset
          );
        },
        update: function (t) {
          if (this.s.enable) {
            var n = this.s.dt.table().node();
            e(n).is(":visible") ? this.enable(!0, !1) : this.enable(!1, !1),
              0 !== e(n).children("thead").length &&
                (this._positions(), this._scroll(void 0 === t || t));
          }
        },
        _constructor: function () {
          var n = this,
            r = this.s.dt;
          e(window)
            .on("scroll" + this.s.namespace, function () {
              n._scroll();
            })
            .on(
              "resize" + this.s.namespace,
              t.default.util.throttle(function () {
                (n.s.position.windowHeight = e(window).height()), n.update();
              }, 50)
            );
          var o = e(".fh-fixedHeader");
          !this.c.headerOffset &&
            o.length &&
            (this.c.headerOffset = o.outerHeight());
          var i = e(".fh-fixedFooter");
          !this.c.footerOffset &&
            i.length &&
            (this.c.footerOffset = i.outerHeight()),
            r
              .on(
                "column-reorder.dt.dtfc column-visibility.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc",
                function (t, e) {
                  n.update();
                }
              )
              .on("draw.dt.dtfc", function (t, e) {
                n.update(e !== r.settings()[0]);
              }),
            r.on("destroy.dtfc", function () {
              n.destroy();
            }),
            this._positions(),
            this._scroll();
        },
        _clone: function (t, n) {
          var r = this,
            o = this.s.dt,
            i = this.dom[t],
            a = "header" === t ? this.dom.thead : this.dom.tfoot;
          if ("footer" !== t || !this._scrollEnabled())
            if (!n && i.floating)
              i.floating.removeClass("fixedHeader-floating fixedHeader-locked");
            else {
              var s = e(document).scrollLeft(),
                l = e(document).scrollTop();
              i.floating &&
                (null !== i.placeholder && i.placeholder.remove(),
                this._unsize(t),
                i.floating.children().detach(),
                i.floating.remove());
              var c = e(o.table().node()),
                u = e(c.parent()),
                d = this._scrollEnabled();
              (i.floating = e(o.table().node().cloneNode(!1))
                .attr("aria-hidden", "true")
                .css({ "table-layout": "fixed", top: 0, left: 0 })
                .removeAttr("id")
                .append(a)),
                i.floatingParent
                  .css({
                    width: u.width(),
                    overflow: "hidden",
                    height: "fit-content",
                    position: "fixed",
                    left: d ? c.offset().left + u.scrollLeft() : 0,
                  })
                  .css(
                    "header" === t
                      ? { top: this.c.headerOffset, bottom: "" }
                      : { top: "", bottom: this.c.footerOffset }
                  )
                  .addClass(
                    "footer" === t
                      ? "dtfh-floatingparentfoot"
                      : "dtfh-floatingparenthead"
                  )
                  .append(i.floating)
                  .appendTo("body"),
                this._stickyPosition(i.floating, "-");
              var f = function () {
                var t = u.scrollLeft();
                (r.s.scrollLeft = { footer: t, header: t }),
                  i.floatingParent.scrollLeft(r.s.scrollLeft.header);
              };
              f(),
                u.off("scroll.dtfh").on("scroll.dtfh", f),
                (i.placeholder = a.clone(!1)),
                i.placeholder.find("*[id]").removeAttr("id"),
                i.host.prepend(i.placeholder),
                this._matchWidths(i.placeholder, i.floating),
                e(document).scrollTop(l).scrollLeft(s);
            }
        },
        _stickyPosition: function (t, n) {
          if (this._scrollEnabled()) {
            var r = this,
              o = "rtl" === e(r.s.dt.table().node()).css("direction");
            t.find("th").each(function () {
              if ("sticky" === e(this).css("position")) {
                var t = e(this).css("right"),
                  i = e(this).css("left");
                if ("auto" === t || o) {
                  if ("auto" !== i && o) {
                    a =
                      +i.replace(/px/g, "") +
                      ("-" === n ? -1 : 1) *
                        r.s.dt.settings()[0].oBrowser.barWidth;
                    e(this).css("left", a > 0 ? a : 0);
                  }
                } else {
                  var a =
                    +t.replace(/px/g, "") +
                    ("-" === n ? -1 : 1) *
                      r.s.dt.settings()[0].oBrowser.barWidth;
                  e(this).css("right", a > 0 ? a : 0);
                }
              }
            });
          }
        },
        _matchWidths: function (t, n) {
          var r = function (n) {
              return e(n, t)
                .map(function () {
                  return (
                    1 *
                    e(this)
                      .css("width")
                      .replace(/[^\d\.]/g, "")
                  );
                })
                .toArray();
            },
            o = function (t, r) {
              e(t, n).each(function (t) {
                e(this).css({ width: r[t], minWidth: r[t] });
              });
            },
            i = r("th"),
            a = r("td");
          o("th", i), o("td", a);
        },
        _unsize: function (t) {
          var n = this.dom[t].floating;
          n && ("footer" === t || ("header" === t && !this.s.autoWidth))
            ? e("th, td", n).css({ width: "", minWidth: "" })
            : n && "header" === t && e("th, td", n).css("min-width", "");
        },
        _horizontal: function (t, n) {
          var r = this.dom[t],
            o = (this.s.position, this.s.scrollLeft);
          if (r.floating && o[t] !== n) {
            if (this._scrollEnabled()) {
              var i = e(e(this.s.dt.table().node()).parent()).scrollLeft();
              r.floating.scrollLeft(i), r.floatingParent.scrollLeft(i);
            }
            o[t] = n;
          }
        },
        _modeChange: function (t, n, r) {
          this.s.dt;
          var o = this.dom[n],
            i = this.s.position,
            a = this._scrollEnabled();
          if ("footer" !== n || !a) {
            var s = function (t) {
                o.floating.attr("style", function (e, n) {
                  return (n || "") + "width: " + t + "px !important;";
                }),
                  a ||
                    o.floatingParent.attr("style", function (e, n) {
                      return (n || "") + "width: " + t + "px !important;";
                    });
              },
              l = this.dom["footer" === n ? "tfoot" : "thead"],
              c = e.contains(l[0], document.activeElement)
                ? document.activeElement
                : null,
              u = e(e(this.s.dt.table().node()).parent());
            if ("in-place" === t)
              o.placeholder && (o.placeholder.remove(), (o.placeholder = null)),
                this._unsize(n),
                "header" === n ? o.host.prepend(l) : o.host.append(l),
                o.floating &&
                  (o.floating.remove(),
                  (o.floating = null),
                  this._stickyPosition(o.host, "+")),
                o.floatingParent && o.floatingParent.remove(),
                e(e(o.host.parent()).parent()).scrollLeft(u.scrollLeft());
            else if ("in" === t) {
              this._clone(n, r);
              var d = u.offset(),
                f = e(document).scrollTop(),
                p = f + e(window).height(),
                h = a ? d.top : i.tbodyTop,
                m = a ? d.top + u.outerHeight() : i.tfootTop,
                g =
                  "footer" === n
                    ? h > p
                      ? i.tfootHeight
                      : h + i.tfootHeight - p
                    : f + this.c.headerOffset + i.theadHeight - m,
                v = "header" === n ? "top" : "bottom",
                b = this.c[n + "Offset"] - (g > 0 ? g : 0);
              o.floating.addClass("fixedHeader-floating"),
                o.floatingParent
                  .css(v, b)
                  .css({
                    left: i.left,
                    height: "header" === n ? i.theadHeight : i.tfootHeight,
                    "z-index": 2,
                  })
                  .append(o.floating),
                s(i.width),
                "footer" === n && o.floating.css("top", "");
            } else
              "below" === t
                ? (this._clone(n, r),
                  o.floating.addClass("fixedHeader-locked"),
                  o.floatingParent.css({
                    position: "absolute",
                    top: i.tfootTop - i.theadHeight,
                    left: i.left + "px",
                  }),
                  s(i.width))
                : "above" === t &&
                  (this._clone(n, r),
                  o.floating.addClass("fixedHeader-locked"),
                  o.floatingParent.css({
                    position: "absolute",
                    top: i.tbodyTop,
                    left: i.left + "px",
                  }),
                  s(i.width));
            c &&
              c !== document.activeElement &&
              setTimeout(function () {
                c.focus();
              }, 10),
              (this.s.scrollLeft.header = -1),
              (this.s.scrollLeft.footer = -1),
              (this.s[n + "Mode"] = t);
          }
        },
        _positions: function () {
          var t = this.s.dt,
            n = t.table(),
            r = this.s.position,
            o = this.dom,
            i = e(n.node()),
            a = this._scrollEnabled(),
            s = e(t.table().header()),
            l = e(t.table().footer()),
            c = o.tbody,
            u = i.parent();
          (r.visible = i.is(":visible")),
            (r.width = i.outerWidth()),
            (r.left = i.offset().left),
            (r.theadTop = s.offset().top),
            (r.tbodyTop = a ? u.offset().top : c.offset().top),
            (r.tbodyHeight = a ? u.outerHeight() : c.outerHeight()),
            (r.theadHeight = s.outerHeight()),
            (r.theadBottom = r.theadTop + r.theadHeight),
            l.length
              ? ((r.tfootTop = r.tbodyTop + r.tbodyHeight),
                (r.tfootBottom = r.tfootTop + l.outerHeight()),
                (r.tfootHeight = l.outerHeight()))
              : ((r.tfootTop = r.tbodyTop + c.outerHeight()),
                (r.tfootBottom = r.tfootTop),
                (r.tfootHeight = r.tfootTop));
        },
        _scroll: function (t) {
          if (!this.s.dt.settings()[0].bDestroying) {
            var n,
              r,
              o = this._scrollEnabled(),
              i = (g = e(this.s.dt.table().node()).parent()).offset(),
              a = g.outerHeight(),
              s = e(document).scrollLeft(),
              l = e(document).scrollTop(),
              c = e(window).height(),
              u = this.s.position,
              d = o ? i.top : u.tbodyTop,
              f = o ? i.left : u.left,
              p = o ? i.top + a : u.tfootTop,
              h = o ? g.outerWidth() : u.tbodyWidth,
              m = l + c;
            if (this.c.header) {
              if (this.s.enable)
                if (!u.visible || l + this.c.headerOffset + u.theadHeight <= d)
                  n = "in-place";
                else if (
                  l + this.c.headerOffset + u.theadHeight > d &&
                  l + this.c.headerOffset + u.theadHeight < p
                ) {
                  n = "in";
                  var g = e(e(this.s.dt.table().node()).parent());
                  l + this.c.headerOffset + u.theadHeight > p ||
                  void 0 === this.dom.header.floatingParent
                    ? (t = !0)
                    : this.dom.header.floatingParent
                        .css({ top: this.c.headerOffset, position: "fixed" })
                        .append(this.dom.header.floating);
                } else n = "below";
              else n = "in-place";
              (t || n !== this.s.headerMode) &&
                this._modeChange(n, "header", t),
                this._horizontal("header", s);
            }
            var v = { offset: { top: 0, left: 0 }, height: 0 },
              b = { offset: { top: 0, left: 0 }, height: 0 };
            if (this.c.footer && this.dom.tfoot.length) {
              this.s.enable
                ? !u.visible || u.tfootBottom + this.c.footerOffset <= m
                  ? (r = "in-place")
                  : p + u.tfootHeight + this.c.footerOffset > m &&
                    d + this.c.footerOffset < m
                  ? ((r = "in"), (t = !0))
                  : (r = "above")
                : (r = "in-place"),
                (t || r !== this.s.footerMode) &&
                  this._modeChange(r, "footer", t),
                this._horizontal("footer", s);
              var y = function (t) {
                return { offset: t.offset(), height: t.outerHeight() };
              };
              if (
                ((v = this.dom.header.floating
                  ? y(this.dom.header.floating)
                  : y(this.dom.thead)),
                (b = this.dom.footer.floating
                  ? y(this.dom.footer.floating)
                  : y(this.dom.tfoot)),
                o && b.offset.top > l)
              ) {
                var x = l - i.top,
                  w =
                    m +
                    (x > -v.height ? x : 0) -
                    (v.offset.top + (x < -v.height ? v.height : 0) + b.height);
                w < 0 && (w = 0),
                  g.outerHeight(w),
                  Math.round(g.outerHeight()) >= Math.round(w)
                    ? e(this.dom.tfoot.parent()).addClass(
                        "fixedHeader-floating"
                      )
                    : e(this.dom.tfoot.parent()).removeClass(
                        "fixedHeader-floating"
                      );
              }
            }
            if (
              (this.dom.header.floating &&
                this.dom.header.floatingParent.css("left", f - s),
              this.dom.footer.floating &&
                this.dom.footer.floatingParent.css("left", f - s),
              void 0 !== this.s.dt.settings()[0]._fixedColumns)
            ) {
              var S = function (t, r, o) {
                if (void 0 === o) {
                  var i = e("div.dtfc-" + t + "-" + r + "-blocker");
                  o = 0 === i.length ? null : i.clone().css("z-index", 1);
                }
                return (
                  null !== o &&
                    ("in" === n || "below" === n
                      ? o
                          .appendTo("body")
                          .css({
                            top: "top" === r ? v.offset.top : b.offset.top,
                            left: "right" === t ? f + h - o.width() : f,
                          })
                      : o.detach()),
                  o
                );
              };
              (this.dom.header.rightBlocker = S(
                "right",
                "top",
                this.dom.header.rightBlocker
              )),
                (this.dom.header.leftBlocker = S(
                  "left",
                  "top",
                  this.dom.header.leftBlocker
                )),
                (this.dom.footer.rightBlocker = S(
                  "right",
                  "bottom",
                  this.dom.footer.rightBlocker
                )),
                (this.dom.footer.leftBlocker = S(
                  "left",
                  "bottom",
                  this.dom.footer.leftBlocker
                ));
            }
          }
        },
        _scrollEnabled: function () {
          var t = this.s.dt.settings()[0].oScroll;
          return "" !== t.sY || "" !== t.sX;
        },
      }),
        (w.version = "3.3.2"),
        (w.defaults = {
          header: !0,
          footer: !1,
          headerOffset: 0,
          footerOffset: 0,
        }),
        (e.fn.dataTable.FixedHeader = w),
        (e.fn.DataTable.FixedHeader = w),
        e(document).on("init.dt.dtfh", function (n, r, o) {
          if ("dt" === n.namespace) {
            var i = r.oInit.fixedHeader,
              a = t.default.defaults.fixedHeader;
            if ((i || a) && !r._fixedHeader) {
              var s = e.extend({}, a, i);
              !1 !== i && new w(r, s);
            }
          }
        }),
        t.default.Api.register("fixedHeader()", function () {}),
        t.default.Api.register("fixedHeader.adjust()", function () {
          return this.iterator("table", function (t) {
            var e = t._fixedHeader;
            e && e.update();
          });
        }),
        t.default.Api.register("fixedHeader.enable()", function (t) {
          return this.iterator("table", function (e) {
            var n = e._fixedHeader;
            (t = void 0 === t || t), n && t !== n.enabled() && n.enable(t);
          });
        }),
        t.default.Api.register("fixedHeader.enabled()", function () {
          if (this.context.length) {
            var t = this.context[0]._fixedHeader;
            if (t) return t.enabled();
          }
          return !1;
        }),
        t.default.Api.register("fixedHeader.disable()", function () {
          return this.iterator("table", function (t) {
            var e = t._fixedHeader;
            e && e.enabled() && e.enable(!1);
          });
        }),
        e.each(["header", "footer"], function (e, n) {
          t.default.Api.register("fixedHeader." + n + "Offset()", function (t) {
            var e = this.context;
            return void 0 === t
              ? e.length && e[0]._fixedHeader
                ? e[0]._fixedHeader[n + "Offset"]()
                : void 0
              : this.iterator("table", function (e) {
                  var r = e._fixedHeader;
                  r && r[n + "Offset"](t);
                });
          });
        });
    })();
})();
