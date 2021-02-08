function Vector(x, y) {
   this.x = x;
   this.y = y;
   this.add = function(vec2) {
     this.x = this.x + vec2.x;
     this.y = this.y + vec2.y;
   };
   this.subtract = function(vec2) {
     this.x = this.x - vec2.x;
     this.y = this.y - vec2.y;
   };
   this.mult = function(vec2) {
     this.x = this.x * vec2.x;
     this.y = this.y * vec2.y;
   };
   this.static_mult = function (vec1, vec2) {
     return new Vector(vec1.x*vec2.x, vec1.y*vec2.y)
   }
   this.limit = function(num) {
     if (this.x > num) {
       this.x = num;
     }
     else if (this.x < -num) {
       this.x = -num;
     }
     if (this.y > num) {
       this.y = num;
     }
     else if (this.y < -num) {
       this.y = -num;
     }
   }
   this.limitX = function(num) {
     if (this.x > num) {
       this.x = num;
     }
     else if (this.x < -num) {
       this.x = -num;
     }
   }
   this.limitY = function(num) {
     if (this.y > num) {
       this.y = num;
     }
     else if (this.y < -num) {
       this.y = -num;
     }
   }
   this.fromAngle = function(a) {
     var v = new Vector(1, 0);
     v.rotate(a);
     return v;
   }
   this.rotate = function(a) {
     var x= this.x;
     var y = this.y;
     this.x = x * Math.cos(a * (Math.PI/180)) + y * -Math.sin(a * (Math.PI/180));
     this.y = x * Math.sin(a * (Math.PI/180)) + y * Math.cos(a * (Math.PI/180));
   }
   this.copy = function() {
     return new Vector(this.x, this.y);
   }
}

function sign(x) {
  return x>0?1:(x===0?0:-1);
}