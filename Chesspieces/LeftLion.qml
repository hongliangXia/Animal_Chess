import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:leftLion
    entityType: "leftLion"
    x:20
    y:5 + 6*side
    width: side
    height: side

    Image {
        source: "../images/animals/left/LeftLion.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: leftCat
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}
