pipeline{
    environment{
        DOCKER_CREDENTIALS = 'Docker_ID'
        dockerImage = ''
        K8S_CREDENTIALS = 'kubeconfig'
    }

    agent any

    stages{
        stage(''){
            steps{
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}