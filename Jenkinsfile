pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Check out the code from  Git repository
                git 'https://github.com/DhaliwalTam/COMP367-Final'
            }
        }
        stage('Build') {
            steps {
                // Build the project
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Step to run tests
                bat 'npm test'
            }
        }
        stage('Code Coverage') {
            steps {
                bat 'npm run coverage || exit 0'
                }
            }
        
        stage('Code Static Analysis') {
            steps {
                bat 'npm run lint'
            }
        }
          stage('Deploy to Dev Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Dev environment
                sh 'echo "Deploying artifact to Dev environment"'
            }
        }
        
        stage('Deploy to QAT Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to QAT environment
                sh 'echo "Deploying artifact to QAT environment"'
            }
        }
        
        stage('Deploy to Staging Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Staging environment
                sh 'echo "Deploying artifact to Staging environment"'
            }
        }
        
        stage('Deploy to Production Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Production environment
                sh 'echo "Deploying artifact to Production environment"'
            }
        }
    }
    
    post {
        success {
            // Notify success
            echo 'Pipeline successfully completed!'
        }
        failure {
            // Notify failure
            echo 'Pipeline failed!'
        }
    }
}
