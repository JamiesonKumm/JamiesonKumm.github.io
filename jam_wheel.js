define(function(require, exports, module) {
    // Custom color picker using <svg> in lieu of being any good at css
    // My wife calls me "Jam", and the color picker is based on a circle, hence "Jam Wheel"
    // Mostly independent of any external code, but there are some instances where functions are re-used from other classes
    // Could be transplanted into another React tool with little difficulty
    var JamWheel = React.createClass({
    /*** React functions ***/
    //     getInitialState: function getInitialState() {
    //         return {
    //             colorList: [],
    //             draggingWheelHandle: false,
    //             draggingAllWheelHandles: false,
    //             draggingSliderHandle: false,
    //             draggingSliderId: '',
    //             saturationLocked: true,
    //             hueLocked: false,
    //             selectedHandleIndex: 0,
    //             sliderGlobalFlags: [false, false, false]
    //         };
    //     },

    //     componentWillMount: function componentWillMount() {
    //         this.setState({
    //             colorList: this.props.colorList,
    //             selectedHandleIndex: this.props.selectedHandleIndex
    //         });
    //     },

    //     componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    //         this.setState({
    //             colorList: newProps.colorList,
    //             selectedHandleIndex: newProps.selectedHandleIndex
    //         });
    //     },

    // /*** Misc/Utility/Whatevs functions ***/
    //     updateSelectedHandleAfterColor: function updateSelectedHandleAfterColor(newAfterColor) {
    //         this.props.updateSelectedHandleAfterColor(newAfterColor);
    //     },

    //     stopAllDragging: function stopAllDragging() {
    //         if (this.props.locked) {
    //             return;
    //         }

    //         this.setState({
    //             draggingWheelHandle: false,
    //             draggingAllWheelHandles: false,
    //             draggingSliderHandle: false,
    //             draggingSliderId: '',
    //             saturationLocked: true,
    //             hueLocked: false
    //         });
    //     },

    //     toggleSliderGlobalFlag: function toggleSliderGlobalFlag(flagIndex) {
    //         var newSliderGlobalFlags = this.state.sliderGlobalFlags;

    //         newSliderGlobalFlags[flagIndex] = !newSliderGlobalFlags[flagIndex];

    //         this.setState({
    //             sliderGlobalFlags: newSliderGlobalFlags
    //         });
    //     },

    // /*** Event handlers ***/
    //     onSliderHandleMouseDown: function onSliderHandleMouseDown(sliderId, e) {
    //         if (window.getSelection) {
    //             window.getSelection().removeAllRanges();
    //         }

    //         if (this.props.locked) {
    //             return;
    //         }

    //         this.setState({
    //             draggingSliderHandle: true,
    //             draggingSliderId: sliderId
    //         });
    //     },

    //     onWheelHandleMouseDown: function onWheelHandleMouseDown(handleIndex, e) {
    //         if (window.getSelection) {
    //             window.getSelection().removeAllRanges();
    //         }

    //         if (this.props.locked) {
    //             return;
    //         }

    //         this.props.updateSelectedHandleIndex(handleIndex);

    //         this.updateSelectedHandleAfterColor(this.state.colorList[handleIndex]);

    //         // Adjusting hue/saturation of just one handle
    //         if (e.shiftKey) {
    //             this.setState({
    //                 draggingWheelHandle: true,
    //                 draggingAllWheelHandles: false,
    //                 draggingSliderHandle: false,
    //                 saturationLocked: true,
    //                 hueLocked: false,
    //                 selectedHandleIndex: handleIndex
    //             });
    //         // Adjusting saturation of all handles
    //         } else if (e.ctrlKey) {
    //             this.setState({
    //                 draggingWheelHandle: true,
    //                 draggingAllWheelHandles: true,
    //                 draggingSliderHandle: false,
    //                 saturationLocked: false,
    //                 hueLocked: true,
    //                 selectedHandleIndex: handleIndex
    //             });
    //         // Adjusting hue/saturation of all handles
    //         } else if (e.altKey) {
    //             this.setState({
    //                 draggingWheelHandle: true,
    //                 draggingAllWheelHandles: true,
    //                 draggingSliderHandle: false,
    //                 saturationLocked: false,
    //                 hueLocked: false,
    //                 selectedHandleIndex: handleIndex
    //             });
    //         // Adjusting hue of all handles
    //         } else {
    //             this.setState({
    //                 draggingWheelHandle: true,
    //                 draggingAllWheelHandles: true,
    //                 draggingSliderHandle: false,
    //                 saturationLocked: true,
    //                 hueLocked: false,
    //                 selectedHandleIndex: handleIndex
    //             });
    //         }
    //     },

    //     onPickerMouseUp: function onPickerMouseUp() {
    //         this.stopAllDragging();
    //     },

    //     onPickerMouseLeave: function onPickerMouseLeave() {
    //         this.stopAllDragging();
    //     },

    //     // Big main handle manipulating boye right here
    //     onWheelMouseMove: function onWheelMouseMove(e) {
    //         if (this.props.locked) {
    //             return;
    //         }

    //         // If we're dragging a handle, then do lots of stuff
    //         if (this.state.draggingWheelHandle) {
    //             // Need the element for calculating local cursor position
    //             var wheelElement = $("#jamWheel-" + this.props.jamWheelId)[0];

    //             var cursorLocation = {
    //                 x: e.clientX - wheelElement.getBoundingClientRect().x,
    //                 y: e.clientY - wheelElement.getBoundingClientRect().y
    //             };

    //             var wheelCenter = {
    //                 x: this.props.width / 2,
    //                 y: this.props.height / 2
    //             };

    //             var xDistanceFromCenter = wheelCenter.x - cursorLocation.x;
    //             var yDistanceFromCenter = wheelCenter.y - cursorLocation.y;

    //             // Since this is an HSB color wheel, each of the color's three values determine some piece of the handle's location
    //             // H: Angle from positive x-axis going clockwise (think unit circle (except clockwise instead of counter-clockwise))
    //             // S: Distance from center of wheel
    //             // B: I lied this has nothing to do with handle's location, but it is controlled via an external slider (see JamWheelSlider below)

    //             // Calculate the saturation based on the euclidean distance from our cursor to the center of the wheel
    //             var saturationRadius = Math.sqrt(Math.pow(xDistanceFromCenter, 2) + Math.pow(yDistanceFromCenter, 2));

    //             // If our mouse is still on the circle somewhere (ie, distanceToCenter <= radius)
    //             if (saturationRadius <= wheelCenter.x) {
    //                 // Calculage the angle (in radians) from the positive x-axis to our cursor (remember, clockwise!)
    //                 var angle = Math.atan2((wheelCenter.y - cursorLocation.y), (wheelCenter.x - cursorLocation.x));
    //                 // Convert to degrees
    //                 var newH = (angle + Math.PI) * 180/Math.PI;

    //                 // Modulo is weird for negative numbers, so let's poor man's modulo instead
    //                 if (newH < 0) {
    //                     newH += 360;
    //                 }

    //                 // Normalize to 0-1
    //                 newH /= 360;

    //                 var selectedHandleIndex = this.state.selectedHandleIndex;
    //                 var updatedColorList = this.state.colorList;

    //                 // If we're dragging all wheel handles, then we've got some more work to do yet
    //                 if (this.state.draggingAllWheelHandles) {
    //                     // Calculate the change in hue so that we can adjust all handles' hue equally
    //                     var hDelta = newH - updatedColorList[selectedHandleIndex][0];
    //                     // Calculate the relative change in saturation so that we can scale all handles' saturation equally
    //                     var saturationMultiplierDivisor = updatedColorList[selectedHandleIndex][1];

    //                     if (saturationMultiplierDivisor <= 0) {
    //                         saturationMultiplierDivisor = 1;
    //                     } 

    //                     var saturationMultiplier = (saturationRadius / wheelCenter.x) / saturationMultiplierDivisor;
    //                     // This flag helps to ensure that we cannot adjust saturation any higher (use case below)
    //                     var saturationMaxedOut = false;
    //                     var newMaxSaturationMultiplier = saturationMultiplier;

    //                     // If we're making saturation bigger
    //                     if (saturationMultiplier > 1) {
    //                         // Go through all colors
    //                         for (var i = 0; i < updatedColorList.length; i++) {
    //                             // If adjusting the saturation of this color by our current multiplier puts it out of range
    //                             if (updatedColorList[i][1] * saturationMultiplier > 1) {
    //                                 // Trip the flag and calculate a NEW saturation multiplier that puts this color at exactly 1 (max)
    //                                 saturationMaxedOut = true;
    //                                 newMaxSaturationMultiplier = (1 / updatedColorList[i][1]);
    //                             }
    //                         }
    //                     }

    //                     // If the flag was tripped, then use the hot new saturation multiplier instead
    //                     if (saturationMaxedOut) {
    //                         saturationMultiplier = newMaxSaturationMultiplier;
    //                     }

    //                     // Finally, go through all colors
    //                     for (var i = 0; i < updatedColorList.length; i++) {
    //                         // If the hue is not locked, then add the hue delta
    //                         if (!this.state.hueLocked) {
    //                             updatedColorList[i][0] = (updatedColorList[i][0] + hDelta) % 1;

    //                             if (updatedColorList[i][0] < 0) {
    //                                 updatedColorList[i][0] += 1;
    //                             }
    //                         }

    //                         // If the saturation is not locked, then multiply by the saturation multiplier
    //                         if (!this.state.saturationLocked) {
    //                             updatedColorList[i][1] *= saturationMultiplier;
    //                         }
    //                     }
    //                 // Else we just need to adjust one color with our new H and S values
    //                 } else {
    //                     updatedColorList[selectedHandleIndex][0] = newH;
    //                     // Normalize new S value from 0-1 by dividing by the wheel's radius
    //                     updatedColorList[selectedHandleIndex][1] = saturationRadius / wheelCenter.x;
    //                 }

    //                 // Nothing like a hard day's work out on the wheel, but now it's time to turn in
    //                 this.setState({
    //                     colorList: updatedColorList
    //                 });

    //                 this.updateSelectedHandleAfterColor(updatedColorList[this.state.selectedHandleIndex]);
    //             }
    //         }
    //     },

    //     // Dragging a slider handle around
    //     onSliderMouseMove: function onSliderMouseMove(sliderHandleRadius, sliderId, adjustingValueIndex, e) {
    //         // Make sure we're actually dragging a handle AND that we're moving along the corresponding slider
    //         if (this.state.draggingSliderHandle && sliderId == this.state.draggingSliderId) {
    //             // Need element to get bounding box to get local cursor position
    //             var sliderElement = $("#" + sliderId);

    //             var updatedColorList = this.state.colorList;

    //             var cursorLocationX = e.clientX - sliderElement[0].getBoundingClientRect().x;

    //             // Get the new value for this slider clamped to 0-1
    //             var adjustedValue = Math.max(Math.min((cursorLocationX - sliderHandleRadius) / (sliderElement.width() - (2 * sliderHandleRadius)), 1), 0);

    //             if (this.state.sliderGlobalFlags[adjustingValueIndex]) {
    //                 var adjustedValueDelta = adjustedValue - updatedColorList[this.state.selectedHandleIndex][adjustingValueIndex];

    //                 for (var i = 0; i < updatedColorList.length; i++) {
    //                     var newValue = (updatedColorList[i][adjustingValueIndex] + adjustedValueDelta);

    //                     if (adjustingValueIndex == 0) {
    //                         if (newValue < 0) {
    //                             newValue += 1;
    //                         } else if (newValue > 1) {
    //                             newValue -= 1
    //                         }
    //                     } else {
    //                         newValue = Math.max(Math.min(newValue, 1), 0);
    //                     }

    //                     updatedColorList[i][adjustingValueIndex] = newValue;
    //                 }
    //             } else {
    //                 // The adjustingValueIndex allows us to reuse this function for all three values in our HSB color arrays
    //                 updatedColorList[this.state.selectedHandleIndex][adjustingValueIndex] = adjustedValue;
    //             }

    //             this.setState({
    //                 colorList: updatedColorList
    //             });

    //             this.updateSelectedHandleAfterColor(updatedColorList[this.state.selectedHandleIndex]);
    //         }
    //     },

    //     onValueTextInputChanged: function onValueTextInputChanged(adjustingValueIndex, adjustingValueMax, e) {
    //         if (this.props.locked) {
    //             return;
    //         }

    //         var newValue = e.target.value / adjustingValueMax;

    //         var updatedColorList = this.state.colorList;

    //         var adjustedValue = Math.max(Math.min(newValue, 1), 0);

    //         updatedColorList[this.state.selectedHandleIndex][adjustingValueIndex] = adjustedValue;

    //         this.setState({
    //             colorList: updatedColorList
    //         });

    //         this.updateSelectedHandleAfterColor(updatedColorList[this.state.selectedHandleIndex]);
    //     },

    //     // Shortcut to allow for clicking on a desired point in the slider instead of having to always drag the handle
    //     onBackgroundMouseDown: function onBackgroundMouseDown(sliderHandleRadius, sliderId, adjustingValueIndex, e) {
    //         if (this.props.locked) {
    //             return;
    //         }

    //         var sliderElement = $("#" + sliderId);

    //         var updatedColorList = this.state.colorList;

    //         var cursorLocationX = e.clientX - sliderElement[0].getBoundingClientRect().x;

    //         var adjustedValue = Math.max(Math.min((cursorLocationX - sliderHandleRadius) / (sliderElement.width() - (2 * sliderHandleRadius)), 1), 0);

    //         if (this.state.sliderGlobalFlags[adjustingValueIndex]) {
    //             var adjustedValueDelta = adjustedValue - updatedColorList[this.state.selectedHandleIndex][adjustingValueIndex];

    //             for (var i = 0; i < updatedColorList.length; i++) {
    //                 var newValue = (updatedColorList[i][adjustingValueIndex] + adjustedValueDelta);

    //                 if (adjustingValueIndex == 0) {
    //                     if (newValue < 0) {
    //                         newValue += 1;
    //                     } else if (newValue > 1) {
    //                         newValue -= 1
    //                     }
    //                 } else {
    //                     newValue = Math.max(Math.min(newValue, 1), 0);
    //                 }

    //                 updatedColorList[i][adjustingValueIndex] = newValue;
    //             }
    //         } else {
    //             // The adjustingValueIndex allows us to reuse this function for all three values in our HSB color arrays
    //             updatedColorList[this.state.selectedHandleIndex][adjustingValueIndex] = adjustedValue;
    //         }

    //         // Since we're here, why not make it so that the handle is now being dragged as well?
    //         this.setState({
    //             draggingSliderHandle: true,
    //             draggingSliderId: sliderId,
    //             colorList: updatedColorList
    //         });

    //         this.updateSelectedHandleAfterColor(updatedColorList[this.state.selectedHandleIndex]);
    //     },

    /*** Render function ***/
        render: function render() {
            return <div>HELLO THERE</div>;

            // var me = this;

            // // You'll see a lot of these kinds of seemingly-arbitrary dimension calculations throughout the JamWheel
            // // That's because I used them a lot
            // // I wanted the JamWheel to be robust enough such that if we wanted to make it bigger/smaller the UI wouldn't get all messed up
            // // Yes, the magic numbers are definitely magic
            // // No, I don't want to talk about it because it's fine for this purpose imo
            // var containerHeight = me.props.height + (me.props.height * me.props.sliderHeightScale * 7);

            // var containerStyle = {
            //     position: "relative",
            //     padding: "1em",
            //     width: (me.props.width * 4/3) + "px",
            //     height: containerHeight + "px"
            // };

            // var selectedColorRGBFill = "";
            // var selectedColorRGBFillMinBrightness = "";
            // var selectedColorRGBFillMaxBrightness = "";
            // var selectedColorRGBFillMinSaturation = "";
            // var selectedColorRGBFillMaxSaturation = "";

            // var wheelLines = [];
            // var wheelHandles = [];
            // var selectedWheelHandle = [];

            // var wheelHandleRadius = me.props.width / 30;

            // // We gon' need this value for later
            // var selectedColor = me.state.colorList[me.state.selectedHandleIndex];

            // for (var i = 0; i < me.state.colorList.length; i++) {
            //     var rgbFill = me.props.generateBackgroundColorStyleString([me.state.colorList[i][0], me.state.colorList[i][1], me.state.colorList[i][2]]);

            //     if (i == me.state.selectedHandleIndex) {
            //         // This handle is the chosen one, so steal its rgbfill for later
            //         selectedColorRGBFill = rgbFill;

            //         // The saturation and brightness slider bars will be filled by a gradient based on the selected color
            //         selectedColorRGBFillMinSaturation = me.props.generateBackgroundColorStyleString([me.state.colorList[i][0], 0, 1]);
            //         selectedColorRGBFillMaxSaturation = me.props.generateBackgroundColorStyleString([me.state.colorList[i][0], 1, 1]);

            //         // The following if statements provide edge-case shortcuts where we may not need to recalculate the rgbfill
            //         // If the brightness is zero, then we can just reuse the selected color's rgbfill for brightnessMin
            //         if (me.state.colorList[i][2] <= 0) {
            //             selectedColorRGBFillMinBrightness = rgbFill;
            //         } else {
            //             selectedColorRGBFillMinBrightness = me.props.generateBackgroundColorStyleString([me.state.colorList[i][0], me.state.colorList[i][1], 0]);
            //         } 

            //         // If the brightness is 100, then we can just reuse the selected color's rgbfill for brightnessMax
            //         if (me.state.colorList[i][2] >= 100) {
            //             selectedColorRGBFillMaxBrightness = rgbFill;
            //         } else {
            //             selectedColorRGBFillMaxBrightness = me.props.generateBackgroundColorStyleString([me.state.colorList[i][0], me.state.colorList[i][1], 1]);
            //         }
            //     }

            //     // These next two lines calculate the handle's desired position on the wheel based on the corresponding color's H (angle) and S (radius) values
            //     // They are also the answer to the age-old question "When am I ever going to need to know Trigonometry in the real world??"
            //     var handleX = (me.props.width / 2) + ((me.props.width / 2) * (Math.cos(me.state.colorList[i][0] * 360 * Math.PI / 180) * me.state.colorList[i][1]));
            //     var handleY = (me.props.height / 2) + ((me.props.height / 2) * (Math.sin(me.state.colorList[i][0] * 360 * Math.PI / 180) * me.state.colorList[i][1]));

            //     var dashedLineColor = (selectedColor[2] >= 0.5) ? "black" : "white";

            //     // Draw a slick dashed line from the center of the wheel to the center of the handle
            //     wheelLines.push(
            //         <line 
            //             key={"jamWheel-" + me.props.jamWheelId + "-line-" + i} 
            //             x1={me.props.width / 2} 
            //             y1={me.props.height / 2} 
            //             x2={handleX} 
            //             y2={handleY} 
            //             stroke={dashedLineColor} 
            //             style={{strokeDasharray:"4 2", zIndex: 2}}
            //         />
            //     );

            //     var wheelOutlineColor = (selectedColor[2] >= 0.5 || i == me.state.selectedHandleIndex) ? "black" : "white";

            //     // Make a sweet circle to represent this handle
            //     var wheelHandle = <circle 
            //         key={"jamWheel-" + me.props.jamWheelId + "-handle-" + i} 
            //         id={"jamWheel-" + me.props.jamWheelId + "-handle-" + i} 
            //         cx={handleX} 
            //         cy={handleY} 
            //         r={wheelHandleRadius} 
            //         stroke={wheelOutlineColor} 
            //         strokeWidth="2" 
            //         fill={rgbFill} 
            //         onMouseDown={me.onWheelHandleMouseDown.bind(me, i)} 
            //         style={{zIndex: 3}}
            //     />;

            //     // If this handle is the chosen one, then add two other circles behind it to guide it on its journey (aka, highlight selected handle)
            //     if (i == me.state.selectedHandleIndex) {
            //         selectedWheelHandle.push(
            //             <circle 
            //                 key={"jamWheel-" + me.props.jamWheelId + "-handleBackground1-" + i} 
            //                 cx={handleX} 
            //                 cy={handleY} 
            //                 r={wheelHandleRadius + 2} 
            //                 stroke="white" 
            //                 strokeWidth="2" 
            //                 fillOpacity="0"
            //             />
            //         );

            //         selectedWheelHandle.push(
            //             <circle 
            //                 key={"jamWheel-" + me.props.jamWheelId + "-handleBackground2-" + i} 
            //                 cx={handleX} 
            //                 cy={handleY} 
            //                 r={wheelHandleRadius + 4} 
            //                 stroke="black" 
            //                 strokeWidth="2" 
            //                 fillOpacity="0"
            //             />
            //         );

            //         selectedWheelHandle.push(
            //             wheelHandle
            //         );
            //     } else {
            //         wheelHandles.push(
            //             wheelHandle
            //         );
            //     }
            // }

            // // Creating the gradiants for the slider bar backgrounds
            // var sliderGradientDefs = [];

            // // The hue slider just uses a range of hue values (with max saturation/brightness) according to the six major colors in HSB
            // // Red, Yellow, Green, Cyan, Blue, and Magenta
            // var hueSliderGradientId = "hueSliderGradient-" + me.props.jamWheelId;
            // sliderGradientDefs.push(
            //     <linearGradient key={hueSliderGradientId} id={hueSliderGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            //         <stop offset="0%" style={{stopColor: "rgb(255,   0,   0)", stopOpacity: 1}} />
            //         <stop offset="16.66%" style={{stopColor: "rgb(255, 255,   0)", stopOpacity: 1}} />
            //         <stop offset="33.33%" style={{stopColor: "rgb(0,   255,   0)", stopOpacity: 1}} />
            //         <stop offset="49.99%" style={{stopColor: "rgb(0,   255, 255)", stopOpacity: 1}} />
            //         <stop offset="66.66%" style={{stopColor: "rgb(0,     0, 255)", stopOpacity: 1}} />
            //         <stop offset="83.33%" style={{stopColor: "rgb(255,   0, 255)", stopOpacity: 1}} />
            //         <stop offset="100%" style={{stopColor: "rgb(255,   0,   0)", stopOpacity: 1}} />
            //     </linearGradient>
            // );

            // // The saturation slider uses a range of all saturation values (0-1) for the selected color's hue/brightness
            // var saturationSliderGradientId = "saturationSliderGradient-" + me.props.jamWheelId;
            // sliderGradientDefs.push(
            //     <linearGradient key={saturationSliderGradientId} id={saturationSliderGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            //         <stop offset="0%" style={{stopColor: selectedColorRGBFillMinSaturation, stopOpacity: 1}} />
            //         <stop offset="100%" style={{stopColor: selectedColorRGBFillMaxSaturation, stopOpacity: 1}} />
            //     </linearGradient>
            // );

            // // The brightness slider uses a range of all brightness values (0-1) for the selected color's hue/saturation
            // var brightnessSliderGradientId = "brightnessSliderGradient-" + me.props.jamWheelId;
            // sliderGradientDefs.push(
            //     <linearGradient key={brightnessSliderGradientId} id={brightnessSliderGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            //         <stop offset="0%" style={{stopColor: selectedColorRGBFillMinBrightness, stopOpacity: 1}} />
            //         <stop offset="100%" style={{stopColor: selectedColorRGBFillMaxBrightness, stopOpacity: 1}} />
            //     </linearGradient>
            // );

            // // The hue slider handle only considers the hue of the selected color
            // var hueSliderHandleRGBFill = me.props.generateBackgroundColorStyleString([selectedColor[0], 1, 1]);
            // // The saturation slider handle only considers the hue/saturation of the selected color
            // var saturationSliderHandleRGBFill = me.props.generateBackgroundColorStyleString([selectedColor[0], selectedColor[1], 1]);
            // // The brightness slider handle uses all three of the selected color's H/S/B values
            // var brightnessSliderHandleRGBFill = selectedColorRGBFill;

            // var hueSliderStyle={
            //     position: "absolute",
            //     zIndex: "1",
            //     top: me.props.height + (me.props.height * me.props.sliderHeightScale * 2)
            // };
            // var saturationSliderStyle={
            //     position: "absolute",
            //     zIndex: "1",
            //     top: me.props.height + (me.props.height * me.props.sliderHeightScale * 4)
            // };
            // var brightnessSliderStyle={
            //     position: "absolute",
            //     zIndex: "1",
            //     top: me.props.height + (me.props.height * me.props.sliderHeightScale * 6)
            // };

            // // ALL TOGETHER NOW!
            // return <div style={containerStyle}>
            //     <img
            //         style={{position: "absolute", zIndex: "0", WebkitUserSelect: "none", MozUserSelect: "none", MsUserSelect: "none"}} 
            //         src="./swf_recolor_tool/hsvBlack.png" 
            //         width={me.props.width}
            //         height={me.props.height}
            //         draggable="false"
            //     />
            //     <img
            //         style={{position: "absolute", zIndex: "0", WebkitUserSelect: "none", MozUserSelect: "none", MsUserSelect: "none", opacity: selectedColor[2]}} 
            //         src="./swf_recolor_tool/hsvWheel.png" 
            //         width={me.props.width} 
            //         height={me.props.height} 
            //         draggable="false"
            //     />
            //     <svg
            //         id={"jamWheel-" +  me.props.jamWheelId}
            //         style={{position: "absolute", zIndex: "1", overflow:"visible"}} 
            //         width={me.props.width} 
            //         height={me.props.height} 
            //         onMouseMove={me.onWheelMouseMove} 
            //         onMouseUp={me.onPickerMouseUp}
            //         onMouseLeave={me.onPickerMouseLeave}
            //     >
            //         <defs>
            //             {sliderGradientDefs}
            //         </defs>
            //         {wheelLines}
            //         {wheelHandles}
            //         {selectedWheelHandle}
            //     </svg>
            //     <JamWheelSlider
            //         selectedColor={selectedColor}
            //         adjustingValueIndex={0}
            //         adjustingValueMax={360}
            //         sliderStyle={hueSliderStyle}
            //         handleColorRGBFill={hueSliderHandleRGBFill}
            //         gradientId={hueSliderGradientId}
            //         sliderId={"jamWheel-" + me.props.jamWheelId + "-hueSlider"}
            //         width={me.props.width}
            //         height={me.props.height * me.props.sliderHeightScale}
            //         sliderWidthScale={me.props.sliderWidthScale}
            //         sliderHeightScale={me.props.sliderHeightScale}
            //         locked={me.props.locked}
            //         onMouseDown={me.onSliderHandleMouseDown}
            //         onMouseMove={me.onSliderMouseMove}
            //         onMouseUp={me.onPickerMouseUp}
            //         onValueTextInputChanged={me.onValueTextInputChanged}
            //         onBackgroundMouseDown={me.onBackgroundMouseDown}
            //         onMouseLeave={me.stopAllDragging}
            //         toggleSliderGlobalFlag={me.toggleSliderGlobalFlag}
            //         isGlobalToggleOn={me.state.sliderGlobalFlags[0]}
            //     />
            //     <JamWheelSlider
            //         selectedColor={selectedColor}
            //         adjustingValueIndex={1}
            //         adjustingValueMax={100}
            //         sliderStyle={saturationSliderStyle}
            //         handleColorRGBFill={saturationSliderHandleRGBFill}
            //         gradientId={saturationSliderGradientId}
            //         sliderId={"jamWheel-" + me.props.jamWheelId + "-saturationSlider"}
            //         width={me.props.width}
            //         height={me.props.height * me.props.sliderHeightScale}
            //         sliderWidthScale={me.props.sliderWidthScale}
            //         sliderHeightScale={me.props.sliderHeightScale}
            //         locked={me.props.locked}
            //         onMouseDown={me.onSliderHandleMouseDown}
            //         onMouseMove={me.onSliderMouseMove}
            //         onMouseUp={me.onPickerMouseUp}
            //         onValueTextInputChanged={me.onValueTextInputChanged}
            //         onBackgroundMouseDown={me.onBackgroundMouseDown}
            //         onMouseLeave={me.stopAllDragging}
            //         toggleSliderGlobalFlag={me.toggleSliderGlobalFlag}
            //         isGlobalToggleOn={me.state.sliderGlobalFlags[1]}
            //     />
            //     <JamWheelSlider
            //         selectedColor={selectedColor}
            //         adjustingValueIndex={2}
            //         adjustingValueMax={100}
            //         sliderStyle={brightnessSliderStyle}
            //         handleColorRGBFill={brightnessSliderHandleRGBFill}
            //         gradientId={brightnessSliderGradientId}
            //         sliderId={"jamWheel-" + me.props.jamWheelId + "-brightnessSlider"}
            //         width={me.props.width}
            //         height={me.props.height * me.props.sliderHeightScale}
            //         sliderWidthScale={me.props.sliderWidthScale}
            //         sliderHeightScale={me.props.sliderHeightScale}
            //         locked={me.props.locked}
            //         onMouseDown={me.onSliderHandleMouseDown}
            //         onMouseMove={me.onSliderMouseMove}
            //         onMouseUp={me.onPickerMouseUp}
            //         onValueTextInputChanged={me.onValueTextInputChanged}
            //         onBackgroundMouseDown={me.onBackgroundMouseDown}
            //         onMouseLeave={me.stopAllDragging}
            //         toggleSliderGlobalFlag={me.toggleSliderGlobalFlag}
            //         isGlobalToggleOn={me.state.sliderGlobalFlags[2]}
            //     />
            // </div>
        }
    });

    // Technically this didn't need to be its own class, but it cuts down on repetition since the sliders are very similar
    // (yes I am aware the this means each slider gets handed like 16 properties, but it's still less LoC this way)
    // var JamWheelSlider = React.createClass({
    // /*** Event handlers ***/
    //     onMouseMove: function onMouseMove(sliderHandleRadius, sliderId, adjustingValueIndex, e) {
    //         this.props.onMouseMove(sliderHandleRadius, sliderId, adjustingValueIndex, e);
    //     },

    //     onMouseDown: function onMouseDown(sliderId, e) {
    //         this.props.onMouseDown(sliderId, e);
    //     },

    //     onValueTextInputChanged: function onValueTextInputChanged(adjustingValueIndex, adjustingValueMax, e) {
    //         this.props.onValueTextInputChanged(adjustingValueIndex, adjustingValueMax, e);
    //     },

    //     onBackgroundMouseDown: function onBackgroundMouseDown(sliderHandleRadius, sliderId, adjustingValueIndex, e) {
    //         this.props.onBackgroundMouseDown(sliderHandleRadius, sliderId, adjustingValueIndex, e);
    //     },

    //     onToggleGlobalClicked: function onToggleGlobalClicked(adjustingValueIndex) {
    //         this.props.toggleSliderGlobalFlag(adjustingValueIndex);
    //     },

    // /*** Render function ***/
    //     render: function render() {
    //         var me = this;

    //         var sliderAndHandle = [];

    //         var sliderStyle={
    //             stroke: "black",
    //             strokeWidth: 1.5,
    //             fill: "url(#" + me.props.gradientId + ")"
    //         };

    //         var sliderHandleStyle={
    //             strokeWidth: 0,
    //             fill: me.props.handleColorRGBFill
    //         };

    //         // Magic numbers galore, but at least it's dynamically scaled based on JamWheel's dimensions!
    //         var sliderWidth = me.props.width * me.props.sliderWidthScale;
    //         var sliderX = me.props.width * ((1 - me.props.sliderWidthScale) / 2);

    //         var sliderHeight = me.props.height;
    //         var sliderHandleRadius = sliderHeight / 2;
    //         var sliderY = sliderHandleRadius;

    //         // Make a fancy rectangle for the slider's background
    //         sliderAndHandle.push(
    //             <rect 
    //                 key={me.props.sliderId + "-rect"}
    //                 id={me.props.sliderId}
    //                 style={sliderStyle} 
    //                 width={sliderWidth} 
    //                 height={sliderHeight} 
    //                 x={sliderX} 
    //                 y={sliderY} 
    //                 rx={sliderHandleRadius} 
    //                 ry={sliderHandleRadius}
    //                 onMouseDown={me.onBackgroundMouseDown.bind(me, sliderHandleRadius, me.props.sliderId, me.props.adjustingValueIndex)}
    //             />
    //         );

    //         // Calculate the slider's handle's position's values based on the selected color
    //         var sliderHandleX = sliderX + sliderHandleRadius + (Math.max(Math.min(me.props.selectedColor[me.props.adjustingValueIndex], 1), 0) * (sliderWidth - (2 * sliderHandleRadius)));
    //         var sliderHandleY = sliderY + (sliderHeight / 2);

    //         // Add a couple circles behind the handle to give it a nice outline
    //         sliderAndHandle.push(
    //             <circle 
    //                 key={me.props.sliderId + "-handleOutline1"} 
    //                 fill={me.props.handleColorRGBFill} 
    //                 cx={sliderHandleX} 
    //                 cy={sliderHandleY} 
    //                 r={sliderHandleRadius + 4} 
    //                 stroke="black" 
    //                 strokeWidth="2"
    //             />
    //         );

    //         sliderAndHandle.push(
    //             <circle 
    //                 key={me.props.sliderId + "-handleOutline2"} 
    //                 fill={me.props.handleColorRGBFill} 
    //                 cx={sliderHandleX} 
    //                 cy={sliderHandleY} 
    //                 r={sliderHandleRadius + 2} 
    //                 stroke="white" 
    //                 strokeWidth="2"
    //             />
    //         );

    //         sliderAndHandle.push(
    //             <circle 
    //                 key={me.props.sliderId + "-handle"} 
    //                 style={sliderHandleStyle} 
    //                 cx={sliderHandleX} 
    //                 cy={sliderHandleY} 
    //                 r={sliderHandleRadius} 
    //                 onMouseDown={me.onMouseDown.bind(me, me.props.sliderId)}
    //             />
    //         );

    //         var globalToggleButton = [];
    //         if (!me.props.locked) {
    //             var globalToggleButtonStyle = {
    //                 position: "absolute",
    //                 left: (sliderWidth * 1.25) + (me.props.width / 3),
    //                 top: (me.props.sliderStyle.top + (sliderHandleRadius / 2)),
    //                 width: "fit-content"
    //             };

    //             var globalToggleButtonClasses = "switch";

    //             if (me.props.isGlobalToggleOn) {
    //                 globalToggleButtonClasses += " is-on";
    //             }

    //             globalToggleButton = <div 
    //                 className={globalToggleButtonClasses} 
    //                 style={globalToggleButtonStyle} 
    //                 onClick={me.onToggleGlobalClicked.bind(me, me.props.adjustingValueIndex)}
    //             >
    //                 <div className="switch__control">
    //                     <span className="switch__toggle">ON</span>
    //                 </div>
    //                 <span className="switch__label">Global</span>
    //             </div>;
    //         }

    //         // Let's bring it on home now
    //         return <div>
    //             <svg 
    //                 key={me.props.sliderId + "-svg"}
    //                 style={me.props.sliderStyle} 
    //                 width={me.props.width} 
    //                 height={me.props.height * 2} 
    //                 onMouseMove={me.onMouseMove.bind(me, sliderHandleRadius, me.props.sliderId, me.props.adjustingValueIndex)} 
    //                 onMouseUp={me.props.onMouseUp}
    //                 onMouseLeave={me.props.onMouseLeave}
    //             >
    //                 {sliderAndHandle}
    //             </svg>
    //             <input
    //                 type="text"
    //                 disabled={me.props.locked}
    //                 value={(me.props.adjustingValueMax * me.props.selectedColor[me.props.adjustingValueIndex]).toFixed(3)} 
    //                 onChange={me.onValueTextInputChanged.bind(me, me.props.adjustingValueIndex, me.props.adjustingValueMax)}
    //                 style={
    //                     {
    //                         "position": "absolute",
    //                         "width": (me.props.width / 3),
    //                         "left": (sliderWidth * 1.2),
    //                         "top": (me.props.sliderStyle.top + (sliderHandleRadius / 2))
    //                     }
    //                 }
    //             />
    //             {globalToggleButton}
    //         </div>;
    //     }
    // });

    // That's all, folks!
    module.exports = JamWheel; 
});