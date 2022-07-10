import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:rightLeopard
    entityType: "rightLeopard"
    x:20
    y:5
    width: side
    height: side

    Image {
        id: rightLeopard
        source: "../images/animals/left/rightLeopard.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: rightLeopard
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}

