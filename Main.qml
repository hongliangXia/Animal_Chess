import Felgo 3.0
import QtQuick 2.15
import QtQuick.Controls 2.15


GameWindow {
    id: window
    screenWidth: 830
    screenHeight: 640
    visible: true
//设置一个y的偏移量
    property int multi_y: 75

    Scene {
        id: scene
        width: 830
        height: 640

        //首页背景设置
        BackgroundImage{
            id:bg
            width: scene.width
            height: scene.height
            source: "../assets/images/map.png"
        }

        Text {
            id: title
            x:startbutton.x-200
            y:100
            //设置字体大小
            font.pixelSize:90
            color: "#123456"
            text: qsTr("Animal Chess")
        }
        //开始游戏按钮
        AppButton{
            id:startbutton
            x:(scene.width-startbutton.width)*0.5
            y:350
            width: 140
            height:50
            text: qsTr("Play")
            textSize:30
            textColor: "white"
            onClicked: {
//                scene.visible = false;
//                window.visible = false;
                var compGame = Qt.createComponent("../qml/Scene/GameScene.qml")
                           .createObject(scene, { width:830, height:640});

            }

//            TapHandler{
//                onTapped: {
//                    scene.visible = false;
//                    var compGame = Qt.createComponent("GameScene.qml")
//                               .createObject(scene, { width:830, height:640});
//                    //点击开始游戏按钮会跳转到游戏界面
//                }
//            }
        }

        //游戏规则按钮
        AppButton{
            id:rulebutton
            x:(scene.width-rulebutton.width)*0.5
            y:startbutton.y+multi_y
            width: startbutton.width
            height:startbutton.height
            textSize:30
            text: qsTr("Rule")
            textColor: "white"
            onClicked: {
//                scene.visible = false;
                var comprule = Qt.createComponent("../qml/Scene/GameRule.qml")
                           .createObject({ width:300, height:600});
            }

//            TapHandler{
//                onTapped: {

//                    //点击游戏规则按钮会跳转到规则介绍界面
//                }
//            }
        }

    }

}
