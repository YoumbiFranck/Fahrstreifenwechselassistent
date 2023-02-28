class Car{
    //diese Klasse representiert alle eigenschaften unseres Autos 
    //Jedes Mal, wenn wir ein Auto erstellen, müssen wir die Eigenschaften des Autos angeben. 
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        //Eigenschaften in Bezug auf die Bewegungen des Autos

        //initiale Geschwindigkeit (Das Auto wollen wir selber bedienen)
        this.speed=0;

        //Beschleunigungsgeschwindigkeit des Autos
        this.acceleration=0.2;

        //Höchstgeschwindigkeit des Autos
        this.maxSpeed=3;


        //Die (Friction) ist die Kraft, die unseres Auto verlangsamt.
        this.friction=0.05;
        this.angle=0;

        this.sensor=new Sensor(this); //Neue Instanz vom Sensor
        this.controls=new Controls(); //Neue Instanz vom Kontroll

    }

    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }
    //Private Methode
    //hier werden die Bewegungen des Autos gesteuert
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        //Damit das Auto, in die Richtung fährt, in der es sich befindet.
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }


    //mit dieser draw-Methode können wir unser Auto zeichnen 
    //als Argument nimmt er den Kontext, den wir definiert haben
    draw(ctx){

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        //Unser Auto wird nur ein einfaches Rechteck sein
        //Dokumentation --> https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        //Auto Bewegung zurücksetzen,
        ctx.restore();
        this.sensor.draw(ctx); //zeichne die Sensoren
    }
}