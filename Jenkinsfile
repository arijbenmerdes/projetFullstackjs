pipeline {
    agent any
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
        // Stage SonarQube pour le projet Server (Nest.js)
        stage('SonarQube Analysis - Server') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh 'mvn sonar:sonar -Dsonar.projectKey=projectNestjs -Dsonar.projectName="projectNestjs" -Dsonar.login=sqp_94cfaf9df0464e7f6e873e243746cfa87b34f6ee'
                    }
                }
            }
        }

                 // Stage SonarQube pour le projet Client (React)

        stage('SonarQube Analysis - Client') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh 'mvn sonar:sonar -Dsonar.projectKey=projectReact -Dsonar.projectName="projectReact" -Dsonar.login=sqp_7828b3a4596a3eea9a7fab07c63959f173adbd83'
                    }
                }
            }
        }
    }

  
}
