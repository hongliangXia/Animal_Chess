import Felgo 3.0
import QtQuick 2.15
import QtQuick.Controls 2.15


GameWindow {
    id: rule
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

        Rectangle{
            id:set
            x:10
            y:10
            width: 810
            height: 620
            color: ("lightgray")
            opacity:0.5

            Text {
                id: r
                text: qsTr("斗兽棋的棋盘:
斗兽棋的棋盘横9列，纵7行，棋子放在格子中。双方底在线各有三个陷阱和一个兽穴。 棋牌中部有两片水域，称之为小河。
共十六个棋子，分为红蓝双方，双方各有八只一样的棋子（下称为：兽 或 动物），按照战斗力强弱排列为：象>狮>虎>豹>狼>狗>猫>鼠。
玩法规则:
游戏开始时，红方先走，然后轮流走棋。每次可走动一只兽，每只兽每次走一方格，除己方兽穴和小河以外，前后左右均可。但是，狮、虎、
鼠还有不同走法：狮虎在小河边时，可以纵横对直跳过小河，且能把小河对岸的敌方较小的兽类吃掉，但是如果对方老鼠在河里，把跳的路线
阻隔就不能跳，若对岸是对方比自己战斗力前的兽，也不可以跳过小河；
鼠是唯一可以走入小河的兽，走法同陆地上一样，每次走一格，上下左右均可，而且，陆地上的其他兽不可以吃小河中的鼠，小河中的鼠也
不能吃陆地上的象，鼠类互吃不受小河影响。")
                color: ("black")
                font.pixelSize:20
                leftPadding: 20
                rightPadding: 20
                lineHeight: 2
            }
        }

    }

}


