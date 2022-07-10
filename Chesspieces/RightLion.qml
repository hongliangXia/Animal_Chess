import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:rightLion
    entityType: "rightLion"
    x:20
    y:5
    width: side
    height: side

    Image {
        id: rightLion
        source: "../images/animals/left/rightLion.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: rightLion
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}
