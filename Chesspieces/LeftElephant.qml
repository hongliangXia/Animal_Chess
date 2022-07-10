import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:leftElephant
    entityType: "leftElephant"
    x:20 + side
    y:5
    width: side
    height: side

    Image {
        source: "../images/animals/left/LeftElephant.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: leftCat
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}

