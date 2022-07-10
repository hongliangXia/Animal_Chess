import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:leftWolf
    entityType: "leftawolf"
    x:20 + 2*side
    y:5 + 2*side
    width: side
    height: side

    Image {
        source: "../images/animals/left/LeftWolf.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: leftCat
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}

