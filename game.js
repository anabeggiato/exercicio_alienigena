        // criando uma lista com as dimensões da tela
        const TamTela = [700, 850]

        // o que essa parte faz?
        const config = {
            type: Phaser.AUTO,
            width: TamTela[0],
            height: TamTela[1],
            
            // ativando a física do jogo
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 300},
                    debug: true
                }
            },

            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config); // criando uma varíavel 'game' e guardando nela um 'novo jogo phaser', que utilizará as configurações definidas em config

        // declaração de variáveis
        var alien;
        var teclado;
        var fogo;
        var plataforma;
        var plataforma2;
        var plataforma3;
        var moeda;
        var pontuacao = 0;
        var placar;
        


        function preload() { // carregar os recursos do jogo
            this.load.image('background', 'assets/bg.png'); //carregando o fundo
            this.load.image('player', 'assets/alienigena.png') //carregando a imagem do alien
            this.load.image('turbo_nave', 'assets/turbo.png') // carregando o fogo da nave
            this.load.image('plataforma_tijolo', 'assets/tijolos.png') // carregando o primeiro tijolo
            this.load.image('plataforma_tijolo2', 'assets/tijolos2.png') // carregando o segundo tijolo
            this.load.image('plataforma_tijolo3', 'assets/tijolos3.png') // carregando o terceiro tijolo
            this.load.image('moeda', 'assets/moeda.png') // carregando a moeda
            this.load.image('coracao', 'assets/coracao.png') // carregando o coração
        }

        function create() {
            // adiciona a tela inicial, definindo seu tamanho
            this.add.image(TamTela[0]/2, TamTela[1]/2, 'background');

            //Adicionando o "foguinho" do modo turbo
            fogo = this.add.sprite(0, 0, 'turbo_nave');
            fogo.setVisible(false);
            
            //criação do alienígena
            alien = this.physics.add.sprite(TamTela[0]/2, 0, 'player');
            alien.setCollideWorldBounds(true);

            teclado = this.input.keyboard.createCursorKeys();

            //Adiciona as plataformas
            plataforma = this.physics.add.staticImage(TamTela[0]/4, TamTela[1]/3, 'plataforma_tijolo');
            this.physics.add.collider(alien, plataforma);

            plataforma2 = this.physics.add.staticImage(TamTela[0]/2, TamTela[1]/1.6, 'plataforma_tijolo2');
            this.physics.add.collider(alien, plataforma2);

            plataforma3 = this.physics.add.staticImage(TamTela[0]/1.4, TamTela[1]/2.5, 'plataforma_tijolo3');
            this.physics.add.collider(alien, plataforma3);

            //Adicionando moeda
            moeda = this.physics.add.sprite(TamTela[0]/3, 0, 'moeda');
            moeda.setCollideWorldBounds(true);
            moeda.setBounce(0.7);
            this.physics.add.collider(moeda, plataforma);
            this.physics.add.collider(moeda, plataforma2);
            this.physics.add.collider(moeda, plataforma3);

            //Adicionando coração
            coracao = this.physics.add.sprite(TamTela[0]/3, 0, 'coracao');
            coracao.setCollideWorldBounds(true);
            coracao.setBounce(0.7);
            this.physics.add.collider(coracao, plataforma);
            this.physics.add.collider(coracao, plataforma2);
            this.physics.add.collider(coracao, plataforma3);

            // adicionando placar 
            placar = this.add.text(50, 50, 'Pontos:' + pontuacao, {fontSize:'45px', fill:'#495613'});

            // adicionando placar 
            placar = this.add.text(50, 50, 'Pontos:' + pontuacao, {fontSize:'45px', fill:'#495613'});

            // Ações a serem executadas quando o alien encostar na moeda
            this.physics.add.overlap(alien, moeda, function (){

                moeda.setVisible(false); // moeda fica 'invisível

                var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); //sorteia um numero
                moeda.setPosition(posicaoMoeda_Y, 100); //ajusta a posição da moeda

                pontuacao += 1; //soma pontuação
                placar.setText('Pontos: ' + pontuacao); //atualiza texto do placar

                moeda.setVisible(true); //ativa a visão da "nova moeda"
            });

            // Ações a serem executadas quando o alien encostar no coração
            this.physics.add.overlap(alien, coracao, function (){

                coracao.setVisible(false); // coração fica 'invisível

                var posicaoCoracao_Y = Phaser.Math.RND.between(50, 650); //sorteia numero
                coracao.setPosition(posicaoCoracao_Y, 100); //ajusta a posição do coração

                pontuacao += 2; //soma pontuação
                placar.setText('Pontos: ' + pontuacao); //atualiza texto do placar

                coracao.setVisible(true); //ativa a visão do "novo coração"
            });
            
        }

        function update() {

            //Movimento para esquerda [<-]
            if (teclado.left.isDown) {
                alien.setVelocityX(-150); }

            //Movimento para a direita [->]
            else if (teclado.right.isDown) {
                alien.setVelocityX(150); }
            
            //Sem moviemnto horizontal [x=0]
            else {
                alien.setVelocityX(0);
            }

            //Movimento para cima [^]
            if (teclado.up.isDown) {
                alien.setVelocityY(-250);
                ativarTurbo();
            }

            //Movimento para baixo [ gravidade em y ]
            else { semTurbo(); }

            //Atualiza a posição do "foguinho" em relação ao alien
            fogo.setPosition(alien.x, alien.y + alien.height/2);
        }

        //criando as funções para ativação e desativação do turbo
        function ativarTurbo() {
            fogo.setVisible(true);
        }

        function semTurbo() {
            fogo.setVisible(false);
        }