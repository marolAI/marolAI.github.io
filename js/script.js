(function () {
    function ac_add_to_head(el) {
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(el, head.firstChild);
    }
    function ac_add_link(url) {
        var el = document.createElement('link');
        el.rel = 'stylesheet'; el.type = 'text/css'; el.media = 'all'; el.href = url;
        ac_add_to_head(el);
    }
    function ac_add_style(css) {
        var ac_style = document.createElement('style');
        if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
        else ac_style.appendChild(document.createTextNode(css));
        ac_add_to_head(ac_style);
    }
    ac_add_link('https://cdn.anychart.com/releases/8.11.0/css/anychart-ui.min.css?hcode=a0c21fc77e1449cc86299c5faa067dc4');
    ac_add_style(document.getElementById("ac_style_samples-bct-tag-cloud-chart-02").innerHTML);
    ac_add_style(".anychart-embed-samples-bct-tag-cloud-chart-02{width:600px;height:450px;}");
})();

anychart.onDocumentReady(function () {

    // create data   
    var data = [
        { x: "learning", value: 80 },
        { x: "includes", value: 56 },
        { x: "lists", value: 44 },
        { x: "meaning", value: 40 },
        { x: "useful", value: 36 },
        { x: "different", value: 32 },
        { x: "grammar", value: 28 },
        { x: "teaching", value: 24 },
        { x: "example", value: 20 },
        { x: "learning1", value: 9 },
        { x: "includes1", value: 18 },
        { x: "lists1", value: 8 },
        { x: "meaning1", value: 4 },
        { x: "useful1", value: 16 },
        { x: "different1", value: 23 },
        { x: "grammar1", value: 82 },
        { x: "teaching1", value: 42 },
        { x: "example1", value: 22 },
        { x: "thing", value: 12 }
    ];

    // create a chart and set the data
    var chart = anychart.tagCloud(data);

    // configure angles
    chart.angles([0]);

    // create and configure a color scale.
    var customColorScale = anychart.scales.ordinalColor();
    customColorScale.ranges([
        { less: 40 },
        { from: 40, to: 60 },
        { greater: 60 }
    ]);
    customColorScale.colors(["lightgray", "gray", "black"]);

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);

    // set the container id
    chart.container("container");

    // set the mode of the tag cloud
    chart.mode("spiral");

    // initiate drawing the chart
    chart.draw();
});





