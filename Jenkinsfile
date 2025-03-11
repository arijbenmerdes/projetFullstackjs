pipeline {
    agent any
    environment {
        SONAR_TOKEN = 'squ_c50d0cca6f6767e85c8a5622a1436b7de2c25854'  // Remplacez par votre jeton d'authentification
    }
    triggers {
            githubPush() // Pour GitHub
        }
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Cloner le dépôt unique avec la branche correspondante
                    git branch: "${env.BRANCH_NAME}", url: 'https://github.com/arijbenmerdes/projetFullstackjs.git'
                }
            }
        }

        stage('Install dependencies - Client') {
            steps {
                script {
                    dir('projet-test-react') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install dependencies - Server') {
            steps {
                script {
                    dir('projet-nest-test') {
                        sh 'npm install'
                    }
                }
            }
        }


        stage('Build application - Client') {
            steps {
                script {
                    dir('projet-test-react') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build application - Server') {
            steps {
                script {
                    dir('projet-nest-test') {
                        sh 'npm run build'
                    }
                }
            }
        }
       // Stage SonarQube pour le projet Client (React)
        stage('SonarQube Analysis - Client') {
            steps {
                script {
                    def scannerHome = tool 'scanner'  // Nom de l'outil SonarQube configuré dans Jenkins
                    withSonarQubeEnv('SonarQube') {  // Nom du serveur SonarQube configuré dans Jenkins
                        // Exécution du sonar-scanner avec le fichier sonar-project.properties pour le client
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.login=${env.SONAR_TOKEN} -Dproject.settings=projet-test-react/sonar-project.properties"
                    }
                }
            }
        }

        // Stage SonarQube pour le projet Server (NestJS)
        stage('SonarQube Analysis - Server') {
            steps {
                script {
                    def scannerHome = tool 'scanner'  // Nom de l'outil SonarQube configuré dans Jenkins
                    withSonarQubeEnv('SonarQube') {  // Nom du serveur SonarQube configuré dans Jenkins
                        // Exécution du sonar-scanner avec le fichier sonar-project.properties pour le serveur
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.login=${env.SONAR_TOKEN} -Dproject.settings=projet-nest-test/sonar-project.properties"
                    }
                }
            }
        }
    }

  
}
