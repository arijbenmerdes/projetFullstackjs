pipeline {
    agent any

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

        stage('Unit Test - Client') {
            steps {
                script {
                    dir('projet-test-react') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Unit Test - Server') {
            steps {
                script {
                    dir('projet-nest-test') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build application - Client') {
            steps {
                script {
                    dir('projet-test-react') {
                        sh 'npm run build-dev'
                    }
                }
            }
        }

        stage('Build application - Server') {
            steps {
                script {
                    dir('projet-nest-test') {
                        sh 'npm run build-dev'
                    }
                }
            }
        }
    }

  
}
