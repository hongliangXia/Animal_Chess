import Felgo 3.0
import QtQuick 2.15
import ""

EntityBase{
    //每个动物所占方块的边长
    property int side: 87.5

    id:leftLeopard
    entityType: "leftLeopard"
    x:20 + 2*side
    y:5 + 4*side
    width: side
    height: side

    Image {
        source: "../images/animals/left/LeftLeopard.png"
        anchors.centerIn: parent;
    }
    MovementAnimation {
      target: leftCat
      property: "x"
      velocity: leftCat.velocity.x
      running: true
    }

}
