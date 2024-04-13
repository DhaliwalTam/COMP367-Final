pipeline {
    agent any
    stages {
       
        stage('Log Branch Name') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME
                    echo "Branch name detected: ${branchName}"
                }
            }
        }
        stage('Checkout') {
            steps {
                // Check out the code from Git repository
                git 'https://github.com/DhaliwalTam/COMP367-Final'
            }
        }
        stage('Build') {
            steps {
                // Change directory to react-client before running npm install
                dir('react-client') {
                    // Build the project
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                // Change directory to react-client before running npm test
                dir('react-client') {
                    // Step to run tests
                    bat 'npm test'
                }
            }
        }
        stage('Code Coverage') {
            steps {
                // Change directory to react-client before running npm run coverage
                dir('react-client') {
                    // Step to run code coverage
                    bat 'npm run coverage || exit 0'
                }
            }
        }
       stage('Code Static Analysis') {
            steps {
                script {
                    // Change directory to react-client before running npm run lint
                    dir('react-client') {
                        try {
                            // Step to run code static analysis
                            bat 'npm run lint'
                        } catch (err) {
                            // Log the error and continue
                            echo "Error occurred during code static analysis: ${err}"
                        }
                    }
                }
            }
        }
        stage('Deploy to Dev Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Dev environment
                bat 'echo "Deploying artifact to Dev environment"'
            }
        }
        stage('Deploy to QAT Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to QAT environment
                bat 'echo "Deploying artifact to QAT environment"'
            }
        }
        stage('Deploy to Staging Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Staging environment
                bat 'echo "Deploying artifact to Staging environment"'
            }
        }
        stage('Deploy to Production Env') {
            when {
                branch 'main'
            }
            steps {
                // Step to deploy artifact to Production environment
                bat 'echo "Deploying artifact to Production environment"'
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
