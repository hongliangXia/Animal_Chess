import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:rightMouse
    entityType: "rightMouse"
    x:20
    y:5
    width: side
    height: side

    Image {
        id: lefttiger
        source: "../images/animals/left/rightMouse.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: rightMouse
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}
