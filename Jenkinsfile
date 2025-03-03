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
    }

  
}
