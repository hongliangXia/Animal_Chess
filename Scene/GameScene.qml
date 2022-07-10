import Felgo 3.0
import QtQuick 2.15
import QtQuick.Controls 2.15
import "../main.js" as che
import "../core.js" as Chess


GameWindow {
    id: game
    screenWidth: 830
    screenHeight: 640
    visible: true

    Scene {
        id: scene
        width: 830
        height: 640

        //首页背景设置
        BackgroundImage{
            id:bg
            width: scene.width
            height: scene.height
            source: "../images/map.png"
        }
//        Rectangle{
//            id:test
//            color: "white"
////            radius: 10
//            x:20
//            y:5
//            width: 87.5
//            height: 87.5
//        }//测试出动物的初始位置

    }

}
