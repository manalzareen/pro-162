AFRAME.registerComponent("bowling",{
    init:function(){
     this.throwBalls()
    },
   throwBalls:function(){
    window.document.addEventListener("keydown",(e)=>{
       if (e.key === "z"){
        var ball = document.createElement("a-entity")
        ball.setAttribute("geometry",{
            primitive:"sphere",
            radius: 0.3,
        })
        ball.setAttribute("material", {
             color: "black",
             opacity: 1
        })
      var cam =document.querySelector("#camera")
      pos = cam.getAttribute("position")
      ball.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z })
      ball.setAttribute("velocity", { x: 0, y: 0, z: -1 })

      var camera = document.querySelector("#camera").object3D
       var direction = new THREE.Vector3();
       console.log(direction)        
       camera.getWorldDirection(direction)
       ball.setAttribute("velocity",direction.multiplyScalar(-9))
            console.log(direction)        
       var scene = document.querySelector("#scene");
      ball.addEventListener("collide",this.removeBalls)
       scene.appendChild(ball)
       }

    })

   },
   removeBalls: function (e) {
     console.log(e.detail.target.el);
     console.log(e.detail.body.el);
     var element = e.detail.target.el;
     var elementHit = e.detail.body.el;
     if (elementHit.id.includes("pin")) {
         var impulse= new CANNON.Vec3(-2,2,1);
         var point = new CANON.Vec3().copy(elementHit.getAttribute("position")) 
         var impulse= new CANNON.Vec3(-2,2,1);
         var point = new CANON.Vec3().copy(elementHit.getAttribute("position"))
         elementHit.body.applyImpulse(impulse,point);   
         element.removeEventListener("collide",this.throwBalls)      
          var scene = document.querySelector("#scene") 

         scene.removeChild(element)
       
     }
   },
})