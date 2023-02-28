class Controls{
    //Die Objektkontrolle soll vier verschiedene Attribute haben
    constructor(){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;

        //Ich rufe die Methode hier, um das Auto zu kontrollieren.
        this.#addKeyboardListeners();
    }

    //diese Methode ist private, deshalb #, und wird nur hier aufgerufen
    //Referenz zum Objekt Controlls
    // Es ist zwingen notenwendig die Arroy funktion von JavaScript zu verwenden.
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            //Abhängig von der gewählten Schlüssel oder dem gedrückten Knopf
            switch(event.key){
                //<
                case "ArrowLeft":
                    this.left=true;
                    break;
                 //>
                case "ArrowRight":
                    this.right=true;
                    break;
                //oben
                case "ArrowUp":
                    this.forward=true;
                    break;
                //unten
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }

        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
            console.table(this);

        }
    }
}