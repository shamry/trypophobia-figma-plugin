
figma.showUI(__html__, {width: 300, height: 500});

let exportNode = figma.currentPage.selection[0];
exportNode.exportAsync({
    format: "PNG",
    constraint: {
        type: "SCALE",
        value: 2,
    }
}).then(resolved => {
    sendToUi(resolved);
}, rejected => {
    console.error(rejected);
});

figma.ui.onmessage = message => {
    if (message.type === "detect"){
        const image = message.data
        figma.ui.postMessage({ type: 'detect', data: image });
    }

    if (message.type === "result"){
        const result = message.data
        figma.ui.postMessage({ type: 'display', data: result });
    }
}



function sendToUi(imagedata) {
    figma.ui.postMessage({ type: 'exportImage', data: imagedata });
}
