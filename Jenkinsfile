pipeline{
    environment{
        registry = "habhi/weather-app"
        DOCKER_CREDENTIALS = 'Docker_ID'
        dockerImage = ''
        K8S_CREDENTIALS = 'kubeconfig'
        releaseName = 'weather-app'
        chartPath = './weather-app-deployment-chart'
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
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('DEPLOYING IMAGE IN DOCKERHUB'){
            steps{
                script{
                    docker.withRegistry('',DOCKER_CREDENTIALS){
                        dockerImage.push()
                    }
                    sh "docker rmi $registry:latest"
                }
            }
        }

        stage('RUNNING IMAGE IN K8S'){
            steps{
                withKubeConfig(
                    credentialId: K8S_CREDENTIALS,
                    caCertificate: '',
                    clusterName: 'minikube',
                    namespace: 'default',
                    serverUrl: ''
                ){
                    script{
                        
                        def helmListOutput = sh(script: 'helm list -q',returnStdOut: true).trim()
                        if(helmListOutput.contains('')){
                            sh "helm upgrade $releaseName $chartPath"
                        }
                        else{
                            sh "helm install $releaseName $chartPath"
                        }

                        //Kubectl commnads
                        sh 'kubectl rollout status deployment weather-app-deployment'
                        sh 'kubectl get svc'
                        sh 'kubectl get deploy'
                        sh 'kubectl get pods'
                    }
                }

            }
        }
    }
}