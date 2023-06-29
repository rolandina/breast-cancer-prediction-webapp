$(".hasHint").hover(
  function () {
    var offset = $(this).offset();
    $(this).next("span").fadeIn(200).addClass("showHint");
    $(this)
      .next("span")
      .css("left", offset.left + "px");
  },
  function () {
    $(this).next("span").fadeOut(200);
  }
);

// age slider range
var ageSlider = document.getElementById("age");
var ageOutput = document.getElementById("ageValue");

ageOutput.innerHTML = ageSlider.value;

ageSlider.oninput = function () {
  ageOutput.innerHTML = this.value;
};

ageSlider.addEventListener("mousemove", function () {
  var x = ageSlider.value;
  var min = ageSlider.min;
  var max = ageSlider.max;
  var color =
    "linear-gradient(90deg, rgb(11,129,160)" +
    ((x - min) / (max - min)) * 100 +
    "%, rgb(214, 214, 214)" +
    ((x - min) / (max - min)) * 100 +
    "%)";
  ageSlider.style.background = color;
});

// tumor size range -----------------------------
var tumorSizeSlider = document.getElementById("tumorSize");
var tumorSizeOutput = document.getElementById("tumorSizeValue");

tumorSizeOutput.innerHTML = tumorSizeSlider.value;

tumorSizeSlider.oninput = function () {
  tumorSizeOutput.innerHTML = this.value;
};

tumorSizeSlider.addEventListener("mousemove", function () {
  var x = tumorSizeSlider.value;
  var min = tumorSizeSlider.min;
  var max = tumorSizeSlider.max;
  var color =
    "linear-gradient(90deg, rgb(11,129,160)" +
    ((x - min) / (max - min)) * 100 +
    "%, rgb(214, 214, 214)" +
    ((x - min) / (max - min)) * 100 +
    "%)";
  tumorSizeSlider.style.background = color;
});

// nodeExamined slider range  --------------------------
var nodeExaminedSlider = document.getElementById("nodeExamined");
var nodeExaminedOutput = document.getElementById("nodeExaminedValue");

nodeExaminedOutput.innerHTML = nodeExaminedSlider.value;

nodeExaminedSlider.oninput = function () {
  nodeExaminedOutput.innerHTML = this.value;
};

nodeExaminedSlider.addEventListener("mousemove", function () {
  var x = nodeExaminedSlider.value;
  var min = nodeExaminedSlider.min;
  var max = nodeExaminedSlider.max;
  var color = `linear-gradient(90deg, rgb(11,129,160)${
    ((x - min) / (max - min)) * 100
  }%, rgb(214, 214, 214)${((x - min) / (max - min)) * 100}%)`;
  nodeExaminedSlider.style.background = color;
});

nodeRate;

// nodeRate slider range  --------------------------
var nodeRateSlider = document.getElementById("nodeRate");
var nodeRateOutput = document.getElementById("nodeRateValue");

nodeRateOutput.innerHTML = nodeRateSlider.value;

nodeRateSlider.oninput = function () {
  nodeRateOutput.innerHTML = this.value;
};

nodeRateSlider.addEventListener("mousemove", function () {
  var x = nodeRateSlider.value;
  var min = nodeRateSlider.min;
  var max = nodeRateSlider.max;
  var color =
    "linear-gradient(90deg, rgb(11,129,160)" +
    ((x - min) / (max - min)) * 100 +
    "%, rgb(214, 214, 214)" +
    ((x - min) / (max - min)) * 100 +
    "%)";
  nodeRateSlider.style.background = color;
});

// // newParam slider range  --------------------------
// var newParamSlider = document.getElementById("newParam");
// var newParamOutput = document.getElementById("newParamValue");

// newParamOutput.innerHTML = newParamSlider.value;

// newParamSlider.oninput = function () {
//   newParamOutput.innerHTML = this.value;
// };

// newParamSlider.addEventListener("mousemove", function () {
// var x = newParamSlider.value;
// var min = newParamSlider.min;
// var max = newParamSlider.max;
// var color =
// "linear-gradient(90deg, rgb(11,129,160)" +
// ((x - min) / (max - min)) * 100 +
// "%, rgb(214, 214, 214)" +
// ((x - min) / (max - min)) * 100 +
// "%)";
//   newParamSlider.style.background = color;
// });

// FORM

$(document).ready(() => {
  $("#prediction-result-card").hide();
  $("form").on("submit", (event) => {
    event.preventDefault();

    var m = "lgb1";
    var age = $("#age").val();
    var ms = "Married";
    var race = "White";
    var age = $("#age").val();
    var tumor_size = $("#tumorSize").val();
    var tstage = $("#tstage").val();
    var nstage = $("#nstage").val();
    var astage = $("#astage").val();
    var prog = $("#progesterone").val();
    var estro = $("#estrogen").val();
    var grade = $("#grade").val();
    var node_examined = $("#nodeExamined").val();
    var node_rate = $("#nodeRate").val();

    // url =
    //   "https://bcp-fast-api.herokuapp.com/prediction/?m=lgb1&age=45&race=White&marital_status=Divorced&tstage=T2&nstage=N3&grade=%20anaplastic%3B%20Grade%20IV&astage=Distant&estrogen_status=Positive&progesterone_status=Positive&tumor_size=33&node_examined=1&positive_node_rate=1";
    url = `https://bcp-fast-api.herokuapp.com/prediction/?m=${m}&age=${age}&race=${race}&marital_status=${ms}&tstage=${tstage}&nstage=${nstage}&grade=${grade}&astage=${astage}&estrogen_status=${estro}&progesterone_status=${prog}&tumor_size=${tumor_size}&node_examined=${node_examined}&positive_node_rate=${node_rate}`;

    // fetch(url)
    // .then(response => response.json())
    // .then(data =>
    //     console.log(data)
    // )

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
    }).done(function (json) {
      pred = json["prediction"];
      if (pred !== "Alive") {
        pred_proba = json["pred_prob"];
      } else {
        pred_proba = 1 - json["pred_prob"];
      }

      console.log(pred);
      $("#status").text(pred);
      $("#proba").text(Math.round(100 * pred_proba));

      let color1 = { r: 19, g: 71, b: 134 }; // Corresponding to #134786
      let color2 = { r: 255, g: 209, b: 36 }; // Corresponding to #ffd124

      // Compute the new color based on pred_proba
      let newColor = {
        r: (color2.r - color1.r) * pred_proba + color1.r,
        g: (color2.g - color1.g) * pred_proba + color1.g,
        b: (color2.b - color1.b) * pred_proba + color1.b,
      };

      // Convert to integer values
      newColor.r = Math.floor(newColor.r);
      newColor.g = Math.floor(newColor.g);
      newColor.b = Math.floor(newColor.b);

      $("#prediction-result-card").css(
        "background-color",
        `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`
      );
      $("#prediction-result-card").css("color", "white");

      // if (pred !== "Alive") {
      //   $("#prediction-result-card").css("background-color", "#134786");
      //   $("#prediction-result-card").css("color", "white");
      // } else {
      //   $("#prediction-result-card").css("background-color", "#ffd124");
      //   $("#prediction-result-card").css("color", "#353b3be");
      // }
      $("#prediction-result-card").fadeIn();
    });
  });
});
