pipeline{
    environment{
        registry = "habhi/weather-app"
        DOCKER_CREDENTIALS = 'Docker_ID'
        dockerImage = ''
        K8S_CREDENTIALS = 'kubeconfig'
    }

    agent any

    stages{
        stage('BUILD'){
            steps{
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('CREATING DOCKER IMAGE'){
            steps{
                script{
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('DEPLOYING IMAGE IN DOCKERHUB'){
            steps{
                script{
                    docker.withRegistry('',DOCKER_CREDENTIALS){
                        dockerImage.push()
                    }
                }
            }
        }
    }
}