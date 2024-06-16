Sorbonne Université

LIP 6 -SLICES


5G deployment


Content table

Introduction        3

Architecture        3

1. Manual deployment        4
1. Kubernetes Setup        4
   1. Docker installation        4
   1. Docker-Cri installation        5
   1. Kubernetes installation        6
1. Deploy K8S Cluster        6
   1. Setup the control plane on the master        6
   1. Join Worker Nodes to Kubernetes Master Node        7
   1. Install Calico Network Plugin        7
1. Deploy 5G Core        7
   1. Helm installation        7
   1. 5G core deployment        8
1. Deploy 5G RAN        8
1. Test 5G deployment        9
1. Automated deployment        10
1. Ansible Playbook Structure for Kubernetes Deployment        10
   1. roles        11
   1. k8s\_master.yml        15
   1. inventory        15
1. Ansible Playbook Structure for 5g Deployment        16
   1. roles        17
   1. 5g\_dep        19
   1. inventory        19
1. How to use it?        19

2\.1 Kubernetes cluster deployment        21

1. 5G deployment        21

Troubleshooting        21

1. Container Runtimes        21
1. K8s installation        22
1. Master as Worker        22
1. Ansible (copy, command: mv)        22
1. Ansible ssh connection        23
1. Use vagrant VM’s        24

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Introduction

The SLICE blueprint provides 5G core and RAN deployment capabilities using Kubernetes, simplifying the management of 5G environments for users. Initially, the manual deployment process was engaged to understand the intricacies of the blueprint. Subsequently, deployment was automated using Ansible. This documentation serves as a comprehensive guide, detailing the steps taken and the processes involved in both manual and automated deployment methods.

The deployment involves four steps, each contributing to the seamless integration of 5G components within the Kubernetes environment:

* Kubernetes Setup and Dependencies: Prior to deployment, Kubernetes and its dependencies were meticulously configured, ensuring a stable foundation for subsequent operations.
* Kubernetes Cluster Deployment: With the groundwork laid, Kubernetes clusters tailored to accommodate the 5G core and/or RAN components were deployed. This step forms the bedrock upon which the 5G infrastructure is built.
* 5G Core Deployment: Following the establishment of Kubernetes clusters, the focus shifted to deploying the 5G core within the designated clusters. This pivotal step lays the groundwork for core network functionality, essential for the operation of 5G services.
* 5G RAN Deployment and Core Integration: Finally, the deployment of the 5G RAN components proceeded, ensuring seamless integration with the previously deployed core infrastructure.

Architecture

In this deployment scenario, the core and RAN functionalities are realized through OpenAirInterface, detailed in the repository available at https://gitlab.eurecom.fr/oai/cn5g/oai-cn5g-fed. These components are orchestrated within the Kubernetes cluster, as depicted in the diagram below.


Figure 1 : One K8s cluster architecture

1. Manual deployment
1. Kubernetes Setup
   1. Docker installation
* Update Package Index:

sudo apt update

`	`\* Install Required Packages:

sudo apt-get install -y ca-certificates curl

`	`\* Create Keyrings Directory:

sudo install -m 0755 -d /etc/apt/keyrings

`	`\* Add Docker GPG Key: Download Docker's GPG Key:

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

`	`\* Set Permissions for GPG Key:

sudo chmod a+r /etc/apt/keyrings/docker.asc

`	`\* Add Docker Repository to APT Sources:

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION\_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null



* Update Package Lists (including Docker Repository):

sudo apt update

`	`\* Install Docker:

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

`	`\* Activate Docker:

sudo systemctl start docker

`	`\* Test Docker Installation:

sudo docker run hello-world

`	`1.2 Docker-Cri installation

* Clone the cri-dockerd Repository:

git clone https://github.com/Mirantis/cri-dockerd.git

cd cri-dockerd

`	`\* Install Make (if not already installed):

sudo apt-get install -y make

`	`\* Download and Extract Go:

wget https://go.dev/dl/go1.22.1.linux-amd64.tar.gz

sudo tar -C /usr/local -xzf go1.22.1.linux-amd64.tar.gz

`	`\* Add Go to the PATH variable:

export PATH=$PATH:/usr/local/go/bin

`	`\* Compile cri-dockerd:

make cri-dockerd

`	`\* Create Directories and Install cri-dockerd:

sudo mkdir -p /usr/local/bin

sudo install -o root -g root -m 0755 cri-dockerd /usr/local/bin/cri-dockerd

`	`\* Install systemd Service Files:

sudo install packaging/systemd/\* /etc/systemd/system

`	`\* Update cri-docker.service to Use New Binary Location:

sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service

`	`\* Reload systemd Daemon and Enable cri-dockerd:

sudo systemctl daemon-reload

sudo systemctl enable --now cri-docker.socket

`	`1.3 Kubernetes installation

* Disable swap and make this change persistent across reboots by disabled it in config files:

sudo swapoff -a

sudo nano /etc/fstab

`	`\* Update the apt package index and install the packages needed to use the Kubernetes apt repository:

sudo apt-get install -y apt-transport-https ca-certificates curl gpg

`	`\* Download the public signing key for Kubernetes package repositories. The same signing key is used for all repositories (the version in the URL can be ignored):

sudo mkdir -m 755 /etc/apt/keyrings

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

`	`\* Add the appropriate Kubernetes apt repository:

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

`	`\* Update the apt package index, install kubelet, kubeadm and kubectl :

sudo apt-get update

sudo apt-get install -y kubelet kubeadm kubectl

`	`\* Lock Kubernetes packages to prevent automatic upgrades:

sudo apt-mark hold kubelet kubeadm kubectl

`	`2. Deploy K8S Cluster

2\.1 Setup the control plane on the master

* Initialize Kubeadm with Pod Network CIDR and API Server Address:

sudo kubeadm init --pod-network-cidr=192.168.0.0/24 --apiserver-advertise-address=Preplace with the IP of master node --cri-socket=unix:///var/run/cri-dockerd.sock

`	`\* Create the kubeconfig file in master so that kubectl can be used to interact with cluster API:

mkdir -p $HOME/.kube

sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config

`	`2.2 Join Worker Nodes to Kubernetes Master Node

* Execute the following command in the master node to recreate the token with the join command:

kubeadm token create --print-join-command

`	`\* Add to the end of the command --cri-socket=unix:///var/run/cri-dockerd.sock--cri-socket=unix:///var/run/cri-docker

* Execute the command generated on the workers nodes in order to join the cluster.
* Setup kubeconfig Files for Workers by Copying Master Configuration by executing this command on the master node:

scp $HOME/.kube/config USERNAME@HOST\_ADDRESS: $HOME/.kube/config

`	`2.3 Install Calico Network Plugin

* Download the Calico networking manifest for the Kubernetes API datastore:

curl https://raw.githubusercontent.com/projectcalico/calico/v3.27.2/manifests/calico.yaml -O

`	`\* Apply the manifest:

kubectl apply -f calico.yaml

`	`3. Deploy 5G Core

For the deployment of the core and RAN components, we'll leverage Helm charts provided by the OpenAir project available on their Git repository. Helm charts are package managers for Kubernetes applications, providing an efficient and standardized way to define, install, and manage complex applications on Kubernetes clusters.

3\.1 Helm installation

* Download Helm GPG signing key:

curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null

`	`\* Install apt-transport-https:

sudo apt-get install apt-transport-https --yes

`	`\* Add Helm repository to Apt sources:

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list

`	`\* Update Apt package index:

sudo apt-get update

`	`\* Install Helm:

sudo apt-get install helm

`	`3.2 5G core deployment

* Clone the OpenAir repository:

sudo git clone https://gitlab.eurecom.fr/oai/cn5g/oai-cn5g-fed.git

`	`\* Access the chart directory:

cd oai-cn5g-fed/charts/oai-5g-core/oai-5g-basic/

`	`\* Execute the chart:

sudo helm dependency update

helm install oai-5g-basic .

`	`\* Check if the component pods are well deployed:

Kubectl get pod -o wide

`	`4. Deploy 5G RAN

The same OpenAire repository will be used to deploy the RAN component.

* Access the gNb chart directory:

cd oai-cn5g-fed/charts/oai-5g-ran/oai-gnb

`	`\* Execute the gNb chart:

helm install oai-gnb .

`	`\* Access the UE chart directory:

cd oai-cn5g-fed/charts/oai-5g-ran/ oai-nr-ue

`	`\* Execute the gNb chart:

helm install oai-nr-ue .

`	`5. Test 5G deployment

* Access the pod's shell:

kubectl exec -it <oai-nr-ue-pod-name> -- bash

`	`\* Ping SPGWU/UPF:

ping  12.1.1.1

`	`\* Ping Google DNS:

ping  8.8.8.8

`	`\* Check the logs of SMF node to see if a session was established:

Kubectl logs oai-smf-6f56d8fc4c-rwlmw

`	`\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


2\. Automated deployment

With the manual deployment process completed and the infrastructure configured, the transition to automating the deployment using Ansible was initiated. This streamlined approach significantly reduces deployment time and ensures consistency across different environments

1. Ansible Playbook Structure for Kubernetes Deployment

In this project, the deployment scripts have been organized using Ansible roles. Each role encapsulates specific tasks related to its purpose, promoting modularity and reusability across different deployment scenarios. Let's delve deeper into the directory structure:






1. roles

The roles directory contains all the Ansible roles utilized in the deployment process. Each role is responsible for a particular aspect of the deployment.

* Docker : responsible for installing and configuring Docker on a target system. Here's a breakdown of what each task does:
* Install ca-certificates and curl: This task uses the apt module to ensure that the latest versions of ca-certificates and curl are installed on the system.
* Create directory /etc/apt/keyrings: This directory is used to store keyring files required for package management operations.
* Download and store Docker key: GPG keys are used to verify the authenticity and integrity of software packages.
* Add Docker repository to Apt sources: It constructs the repository URL dynamically based on the system's architecture and distribution codename.
* Update package information: ensures that the latest package metadata is available for subsequent package installation and updates.
* Install Docker packages: This task installs the Docker-related packages (docker-ce, docker-ce-cli, containerd.io, docker-buildx-plugin, docker-compose-plugin) using the apt module. These packages include the Docker engine, command-line interface, container runtime, and additional plugins.
* Start Docker service: Finally, this task ensures that the Docker service is started and enabled.
* Docker-cri : automates the setup of cri-dockerd, which is a container runtime interface (CRI) implementation for Docker. Here's a summary of what each task accomplishes:
* Copy the cri-dockerd archive and extract it: Copies the cri-dockerd.tar.gz archive which was stored in files to the /install/ directory.
* Install the 'make' package: ensure that the make package is installed on the system.
* Copy Go archive and extract it : Copies the go1.22.1.linux-amd64.tar.gz archive to the /tmp/ directory and extract it into the /usr/local directory.
* Execute the command 'make cri-dockerd': Runs the make cri-dockerd command within the cri-dockerd directory to build the cri-dockerd binary.
* Copy the 'cri-dockerd' file to /usr/local/bin: Copies the cri-dockerd binary to the /usr/local/bin/ directory.
* Copy the systemd files to /etc/systemd/system: Copies systemd unit files from the packaging/systemd/ directory to /etc/systemd/system/.
* Replace the path in the cri-docker.service file: Modifies the path in the cri-docker.service systemd unit file to reflect the new location of the cri-dockerd binary.
* Reload the systemd daemon: Reloads the systemd daemon to apply the changes made to systemd unit files.
* Enable and start the cri-docker socket: Enables and starts the cri-docker.socket systemd unit.
* Start cri-docker service: Starts the cri-docker.service systemd unit.
* Ensure cri-dockerd is restarted and running: Ensures that the cri-dockerd service is restarted and running.
* k8s : is responsible for setting up a Kubernetes environment on the target system. Let's break down each task:
* Disable all swaps: Disables all swap partitions on the system using the swapoff -a command.
* Check if required packages are installed: Checks if the required packages (apt-transport-https, ca-certificates, curl, gnupg) are already installed on the system.
* Install required packages if not already installed: Install the required packages if they are not already present on the system.
* Create /etc/apt/keyrings directory with correct permissions.
* Remove existing GPG key file to ensure it can be updated: Removes any existing GPG key file to ensure it can be updated with the latest key.
* Download Kubernetes GPG key and place it in /etc/apt/keyrings/kubernetes-apt-keyring.gpg.
* Create /etc/apt/sources.list.d/kubernetes.list file.
* Update package cache: Updates the package cache to ensure the latest package information is available.
* Install kubelet, kubeadm, and kubectl packages: Installs the kubelet, kubeadm, and kubectl packages required for Kubernetes.
* Mark kubelet, kubeadm, and kubectl packages as on hold: Marks the kubelet, kubeadm, and kubectl packages as on hold to prevent them from being automatically upgraded.
* k8s\_master : orchestrates the initialization and setup of a Kubernetes master node. Here's what each task accomplishes:
* Include initialization tasks: This task includes the tasks defined in the k8s\_init.yml file.

-> k8s\_init : handles the initialization tasks for setting up a Kubernetes master node. Here's what each task does:

- Get user's home directory: Executes the pwd command to obtain the user's home directory and registers the result in the user\_Homedir variable.
- Initialize Kubeadm: Runs the kubeadm init command to initialize the Kubernetes control plane. It specifies the pod network CIDR, API server address, and CRI socket based on the provided variables.
- Debug user's home directory: Displays the user's home directory for debugging purposes.
- Create kubeconfig directory: Creates the .kube directory in the user's home directory if it doesn't exist already.
- Copy kubeconfig file: Copies the Kubernetes configuration file (admin.conf) from /etc/kubernetes/ to the .kube directory in the user's home directory.
- Set ownership of ~/.kube/config file: Sets the ownership of the config file in the .kube directory to the current user, ensuring proper permissions for Kubernetes configuration.
* Deploy Calico network: This task includes the tasks defined in the k8s\_calico.yml file if the cni\_plugin variable is set to 'calico'. Calico is a popular networking plugin for Kubernetes that provides networking and network policy enforcement.

-> k8s\_calico : Ansible role manages the deployment of the Calico networking plugin for Kubernetes. Here's what each task accomplishes:

- Copy the Calico file: Copies the calico.yml file to the destination /calico.yml. This file contains the configuration for deploying Calico within the Kubernetes cluster.
- Ensure required directories exist for Calico: Ensures that the necessary directories for Calico operation exist. These directories include /etc/cni/net.d, /var/run/calico, /var/lib/cni/multus, and /run/k8s.cni.cncf.io. These directories are crucial for Calico's networking functionality.
- Apply Calico manifest: Applies the Calico manifest (calico.yml) to the Kubernetes cluster using the kubectl apply command. The KUBECONFIG environment variable specifies the location of the Kubernetes configuration file (admin.conf).
- Wait for master node to be ready: Waits for the master node to be ready by checking if port 6443 is in the started state on the specified host (ansible\_host). This ensures that the Kubernetes API server is up and running before proceeding with further tasks.
* Deploy Flannel network: Similarly, this task includes the tasks defined in the k8s\_flannel.yml file if the cni\_plugin variable is set to 'flannel'. Flannel is another networking plugin for Kubernetes commonly used in cluster deployments.

-> k8s\_flannel : Ansible role manages the deployment of the Flannel networking plugin for Kubernetes. Here's a breakdown of each task:

- Copy the Flannel file: Copies the flannel.yml file to the destination /flannel.yml. This file contains the configuration necessary for deploying Flannel within the Kubernetes cluster.
- Ensure required directories exist for Flannel: Ensures that the necessary directories for Flannel operation exist. These directories include /etc/cni/net.d, /run/flannel, /var/lib/cni/multus, and /run/k8s.cni.cncf.io. These directories are essential for Flannel's networking functionality.
- Apply Flannel manifest: Applies the Flannel manifest (flannel.yml) to the Kubernetes cluster using the kubectl apply command. The KUBECONFIG environment variable specifies the location of the Kubernetes configuration file (admin.conf).
- Wait for master node to be ready: Waits for the master node to be ready by checking if port 6443 is in the started state on the specified host (ansible\_host). This ensures that the Kubernetes API server is up and running before proceeding with further tasks.
* Include cluster information tasks: This task includes the tasks defined in the k8s\_info.yml file.

-> k8s\_info : responsible for gathering information and saving relevant files from the Kubernetes master node. Here's what each task does:

- Create token and get output with retry and debug: Executes the kubeadm token create --print-join-command command to create a token for node joining and registers the output in the command\_output variable. This task includes retry logic with up to 5 retries, waiting for 10 seconds between each attempt. The task also sets the KUBECONFIG environment variable to /etc/kubernetes/admin.conf.
- Save output to a file: Saves the output of the previous task (join command) to a file named output.sh on the master node. The output includes the command output obtained from the command\_output variable, along with the --cri-socket=unix:///var/run/cri-dockerd.sock option.
- Save file to local machine: Fetches the output.sh file from the master node and saves it to the local machine. The flat: yes option ensures that the file is saved without preserving its directory structure.
- Fetch admin.conf from master node: Fetches the admin.conf file from the master node's /etc/kubernetes/ directory and saves it to the files directory on the local machine. The flat: yes option ensures that the file is saved without preserving its directory structure.
* k8s\_worker : ensure that the worker node is configured properly to join the Kubernetes cluster and have the necessary configuration files in place for interaction with the cluster.
* Execute the command stored in a file on the remote node: Executes the command stored in the output.sh script file on the remote node.
* Get user's home directory: Retrieves the home directory path of the user on the remote node using the pwd command and registers it in the user\_Homedir variable. The task does not indicate a change when executed (changed\_when: false).
* Create kubeconfig directory: Creates the .kube directory in the user's home directory if it does not already exist. The directory is set with permissions 0755 to ensure it is accessible.
* Copy admin.conf to "{{ user\_Homedir.stdout }}/.kube/config": Copies the admin.conf file, obtained from the files directory during setup, to the .kube/config file in the user's home directory. This file is essential for configuring kubectl on the worker node.

1\.2 k8s\_master.yml

This playbook performs the installation and initialization of a Kubernetes cluster, including setting up Docker, Docker-cri, and Kubernetes dependencies, initializing the Kubernetes master node, and joining worker nodes to the cluster. ensuring that both the master and worker nodes are properly configured to support containerized workloads and network communication within the cluster. Here's a breakdown of what each part does:

* Install k8s dependencies:
* Hosts: Applies to all hosts in the inventory (all).
* Become: Uses privilege escalation to become the root user (become: yes).
* Roles: Executes three roles: docker, docker-cri, and k8s. These roles are responsible for installing Docker, Docker-cri, and Kubernetes dependencies on all hosts in the inventory. This step ensures that all hosts have the necessary software dependencies installed to support Kubernetes.
* Initialize k8s cluster:
* Hosts: Applies only to hosts tagged as masters.
* Become: Uses privilege escalation to become the root user (become: yes).
* Roles: Executes the k8s\_master role, which initializes the Kubernetes master node. It configures the master node with the specified CNI pod network CIDRs, either using Calico or Flannel as the networking plugin. This role prepares the master node for accepting connections from worker nodes and managing the Kubernetes cluster.
* Join cluster:
* Hosts: Applies only to hosts tagged as workers.
* Become: Uses privilege escalation to become the root user (become: yes).
* Roles: Executes the k8s\_workers role, which joins the worker nodes to the Kubernetes cluster. This role ensures that each worker node is properly configured to communicate with the master node and participate in the Kubernetes cluster's workload distribution.

1\.3 inventory

The hosts file in the inventory directory is a configuration file used by Ansible to define the hosts (servers) that Ansible will manage and their corresponding attributes. In this case:

* [masters]:
* This is a group name that categorizes hosts as master nodes in the Kubernetes cluster.
* master1 is the hostname of the master node.
* ansible\_host=192.168.56.101 specifies the IP address of the master node. Ansible will use this IP address to connect to the master node.
* ansible\_user=vagrant specifies the username that Ansible should use when connecting to the master node.
* [workers]:
* This is a group name that categorizes hosts as worker nodes in the Kubernetes cluster.
* worker1 is the hostname of the worker node.
* ansible\_host=192.168.56.102 specifies the IP address of the worker node. Ansible will use this IP address to connect to the worker node.
* ansible\_user=vagrant specifies the username that Ansible should use when connecting to the worker node.

Additional workers can be added by including another line in the workers group, specifying the IP address and username of the new worker as illustrated below.

worker2 ansible\_host=192.168.56.102 ansible\_user=vagrant

`	`2. Ansible Playbook Structure for 5g Deployment

Similar to the Kubernetes deployment process, Ansible roles were utilized to deploy the 5G core and RAN, operating on the Kubernetes cluster previously set up. Let's explore the directory arrangement in more detail:


2\.1 roles

The directory called "roles" also includes the Ansible roles used in the 5G core and the deployment process.

* 5g : This role is responsible for orchestrating the deployment process of various components within the 5G core and RAN network infrastructure using Ansible. Each task within the "5g" role is required for the deployment.

-> 5g\_core : This task is used to update Helm dependencies and install a Helm chart for the OAI (OpenAirInterface) 5G core network.

* Ensure destination directory exists: This task ensures that a directory /5g exists on the target host. It uses the ansible.builtin.file module to create a directory if it does not already exist. The become: yes directive indicates that the task should be executed with elevated privileges.
* Copy oai-5g-core.tar.gz to the target host: This task copies the oai-5g-core.tar.gz file to the /5g directory on the target host. It uses the ansible.builtin.copy module for this purpose. Again, become: yes is used to execute the task with elevated privileges.
* Extract files from oai-5g-core.tar.gz: This task extracts the contents of oai-5g-core.tar.gz into the /5g directory on the target host. It uses the ansible.builtin.unarchive module for this purpose. The remote\_src: true parameter indicates that the source file is located on the controller node, not the target host.
* Update Helm dependencies: This task updates the dependencies of the Helm chart located in /5g/oai-5g-core/oai-5g-basic. It uses the helm dependency update command and specifies the working directory using the chdir argument.
* Install Helm chart: This task installs the Helm chart named oai-core from the directory /5g/oai-5g-core/oai-5g-basic. It uses the helm install command.
* Fetch status of all pods: This task retrieves information about all pods in the Kubernetes cluster using the kubernetes.core.k8s\_info module. The information is stored in the pod\_info variable for later use.
* Wait for all pods to be in running state: This task continuously checks the status of pods until all pods are in the Running state. It uses the kubectl get pods command to fetch the names of pods that are not in the Running state, and it registers the output in the not\_running\_pods variable. The until directive specifies the condition to wait for, and retries, delay, and changed\_when control the retry behavior and output handling.


-> 5g\_RAN :These tasks are related to updating Helm dependencies and installing a Helm chart for the OAI-GNB (OpenAirInterface-GNB) and a user equipment:

* Copy oai-nr-ue.tar.gz to the target host: This task uses the ansible.builtin.copy module to copy the oai-nr-ue.tar.gz file from the source (presumably the controller node) to the destination /5g/oai-nr-ue.tar.gz on the target host. The become: yes directive is used to execute the task with elevated privileges.
* Copy oai-gnb.tar.gz to the target host: Similar to the previous task, this task copies the oai-gnb.tar.gz file to the destination /5g/oai-gnb.tar.gz on the target host using the ansible.builtin.copy module.
* Extract oai-nr-ue.tar.gz and oai-gnb.tar.gz files: This task extracts the contents of both oai-nr-ue.tar.gz and oai-gnb.tar.gz files onto the target host. It uses the ansible.builtin.unarchive module, specifying the source (src) as the path to each tar.gz file and the destination (dest) as /5g directory on the target host. The remote\_src: false parameter indicates that the source files are already on the target host.
* Install oai-gnb Helm chart: This task installs the Helm chart for oai-gnb from the directory /5g/oai-gnb. It uses the helm install command with the directory specified by chdir.
* Install oai-nr-ue Helm chart: Similar to the previous task, this task installs the Helm chart for oai-nr-ue from the directory /5g/oai-nr-ue. It also uses the helm install command with the directory specified by chdir.

-> init :  This task sequence performs several actions related to setting up Helm, managing package repositories, installing software packages, and copying files from a local controller to a remote node:

* Ensure pip3 is installed: This task uses the ansible.builtin.apt module to ensure that python3-pip is installed on the target system. If it's not present, it installs it.
* Install Kubernetes module via pip: This task uses the ansible.builtin.pip module to install the kubernetes Python module.
* Check if Helm is installed: This task uses the command module to check if Helm is installed by running the which helm command. The result is registered in the variable helm\_check. The failed\_when: false and changed\_when: false directives ensure that the task does not fail or show as changed if Helm is not found.
* Install dependencies: This task installs dependencies required by Helm if Helm is not found (helm\_check.rc != 0). It installs curl using the apt module.
* Download Helm: If Helm is not found, this task downloads the Helm binary from the specified URL using the get\_url module and saves it to /tmp/helm-v3.7.0-linux-amd64.tar.gz.
* Extract Helm tar.gz: This task extracts the Helm binary from the downloaded tar.gz file using the ansible.builtin.unarchive module.
* Move Helm to /usr/local/bin: After extracting the Helm binary, this task moves it to the /usr/local/bin directory, making it available system-wide. It uses the command module with mv to move the binary and ensures idempotence by specifying the created parameter.
* Verify Helm installation (for new installations): This task verifies the Helm installation by running the helm version command and registers the output in the variable helm\_version\_output.

Note:  The files, including oai-5g-core, oai-gnb, and oai-UE, were transferred from the OpenAirInterface to install the various components of the 5G network.

2\.2 5g\_dep

This YAML  defines an Ansible playbook named "deploy 5g" with the following characteristics:

* name: "deploy 5g" - This is the name given to the playbook, describing its purpose, which is to deploy a 5G network.
* hosts: "masters" - This specifies the group of hosts (servers or machines) on which the playbook will be executed. In this case, it targets the group named "masters", indicating that the tasks in the playbook will run on those hosts.
* roles: This section specifies the roles to be executed in the playbook which is  "5g" role. The details of what tasks are included in this role are defined previously.

2\.3 inventory

This inventory file is the same one utilized in the Kubernetes deployment. It encompasses the IP addresses and usernames of both the Kubernetes cluster's master and worker nodes.

3\. How to use it?

To use the automated deployment of Kubernetes and 5G Core and RAN, you'll need to adhere to the outlined steps below. These steps are designed to streamline the process, ensuring seamless implementation and configuration of the requisite infrastructure.

* Install ansible : install ansible by executing the following command for Ubuntu/Debian on the deploying VM.

sudo apt install ansible

ansible-galaxy collection install community.kubernetes

ansible-galaxy collection install cloud.common

`	`\* add user to sudoers file : if a user that is not the root it needs to be added to the sudo group.

* Add the user to the sudo group (replace username with actual username:

sudo usermod -aG sudo username

`	   `\* Users can enable passwordless sudo access by appending a line to the visudo file. Begin by executing the command :

sudo visudo

`	   `\* Next, insert the following line into the end of the file, substituting <username> with the respective user's name. This entry grants the specified user unrestricted sudo privileges without requiring a password prompt.

<username> ALL=(ALL) NOPASSWD: ALL

`	`\* Generate ssh key :  To enable Ansible's access to remote machines for configuration deployment, it's essential to generate an SSH public key for the machine initiating the deployment. This SSH public key will facilitate secure communication between the deployment machine and the remote hosts. To accomplish this, follow the outlined steps below:

* Generate SSH Key Pair: This command will create both a public key (id\_rsa.pub) and a private key (id\_rsa) in the default SSH directory.

ssh-keygen -t rsa -b 4096

`	   `\* Copy Public Key to Remote Hosts: Once the SSH key pair is generated, copy the content of the public key (id\_rsa.pub) to the ~/.ssh/authorized\_keys file on each of the remote hosts. This step will allow the deployment machine to authenticate with the remote hosts securely.(change the path to the id\_rsa\_pub and the destination username and ip address accordingly to yours)

Note: If deployment (ansible controller) is initiated from a remote host (master or Workers), the id\_rsa.pub must also be added to the ~/.ssh/authorized\_keys file.

ssh-copy-id -i  ~/.ssh/id\_rsa.pub username@ip\_address(remote hosts)

`	`\* Clone the git repository : the Git repository must be cloned to the local machine by executing the following command:

git clone https://gitlab.noc.onelab.eu/onelab/slices-5g-blueprint.git

`	`\* modify the hosts file :The hosts file should be updated with the IP addresses and usernames of both the master and worker machines intended for deploying the 5G system.

cd slices-5g-blueprint/inventory

vim hosts

`	`2.1 Kubernetes cluster deployment

Once the inventory file is configured, the deployment of the Kubernetes cluster can be initiated using one of the following two commands. The main distinction between them lies in the network plugin they utilize. One command utilizes Calico as the network plugin, while the other employs Flannel. The option that best aligns with the platform and requirements can be selected.

Access the main directory first to launch the command.

cd  ..

`	`\* Deploy with Flannel plugin :

ansible-playbook -i inventory/  k8s\_master.yml -e "cni\_plugin=flannel"

`	`\* Deploy with Calico plugin :

ansible-playbook -i inventory/  k8s\_master.yml -e "cni\_plugin=calico"



2\.2 5G deployment

Upon configuring the Kubernetes cluster, you're now able to deploy the 5G core and RAN components by executing the provided command.

ansible-playbook -i inventory/  5g\_dep.yml

`	`The deployment of the 5g core and RAN pod’s can be checked using the following command.

kubectl get pods -A

`	`To test the deployment is the same thing as in the manual deployment.

Troubleshooting

1. Container Runtimes

In this deployment, Docker was utilized as a container runtime. If containerd is already present, an error may occur during Kubernetes deployment, requiring specification of the container runtime socket.

* Error:

Found multiple CRI endpoints on the host. Please define which one do you wish to use by setting the 'criSocket' field in the kubeadm configuration file: unix:///var/run/containerd/containerd.sock, unix:///var/run/cri-dockerd.sock

`	`\* Solution:

* Precise the cri socker adding this --cri-socket=unix:///var/run/cri-dockerd.sock to the init kubeadm command.
* Or remove containerd using the following commands:

sudo rm -r /etc/containerd

sudo rm -r /var/lib/containerd

sudo rm -r /run/containerd

`	`2. K8s installation

When attempting to configure the Kubernetes archive Repository from https://apt.kubernetes.io, the error below will be encountered. This is due to the deprecation and freezing of legacy package repositories (apt.kubernetes.io and yum.kubernetes.io) starting from September 13, 2023.

* Error:

E: The repository 'https://apt.kubernetes.io kubernetes-xenial Release' does not have a Release file.

N: Updating from such a repository can't be done securely, and is therefore disabled by default.

N: See apt-secure(8) manpage for repository creation and user configuration details.

`	`\* Solution:

Use the new package repositories hosted at pkgs.k8s.io as shown in the part “3. Kubernetes installation “.

3\. Master as Worker

By default, pods are not deployed on the master in k8s cluster for security reasons. So, to have a single-machine Kubernetes cluster for development purposes, the following command must be executed:

kubectl taint nodes --all node-role.kubernetes.io/control-plane-



4\. Ansible (copy, command: mv)

When automating these commands with Ansible, environment-related issues were encountered. The copy module fails to accurately transfer the specified files to the designated directories.

sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service

`	`\* Solution:

add remote\_src: yes

- name: Copier les fichiers systemd vers /etc/systemd/system

copy:

src: /cri-dockerd/packaging/systemd/

dest: /etc/systemd/system/

owner: root

group: root

mode: '0644'

remote\_src: yes



5\. Ansible ssh connection

If the user of the remote machine, where Kubernetes and 5G are to be deployed, is not included in the sudoers file, or if it is added but not placed in the last line of the file, the following error will be encountered with ansible prompting for the sudo password, as illustrated below.

* Error:

TASK [Gathering Facts] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

fatal: [132.227.122.52]: FAILED! => {"msg": "Missing sudo password"}

PLAY RECAP \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

132\.227.122.52             : ok=0    changed=0    unreachable=0    failed=1    skipped=0    rescued=0    ignored=0

`	`\* Solution:

* adjust the sudoers file.
* Or add the user password as an extra variable for ansible.

ansible-playbook -i inventories/ k8s\_master.yml --extra-vars "ansible\_sudo\_pass=your\_password"



6\. Use vagrant VM’s

If the utilization of virtual machines (VMs) within another VM is desired, Vagrant VMs can be employed. To achieve this, follow the subsequent steps:

* Install Vagrant software :

curl -O https://releases.hashicorp.com/vagrant/2.2.9/vagrant\_2.2.9\_x86\_64.deb

sudo apt install ./vagrant\_2.2.9\_x86\_64.deb

`	`\* Install VirtualBox version 6 :

sudo apt install -y dkms build-essential linux-headers-$(uname -r)

sudo apt-get install virtualbox-6.1



* Set up a Vagrant directory :

sudo mkdir vagrant

`	`\* Customize the Vagrantfile according to desired VM specifications. (a pre-configured Vagrantfile that creates two VMs: one named kubmaster with 2GB of RAM, and the other named kubnode with 8GB of RAM. Both have static IP addresses. is provided)

cd vagrant

vim Vagrantfile

`	`\* Launch the Vagrantfile :

vagrant up

`	`\* Access the VMs : change the host name with the one configured in the Vagrantfile.

vagrant ssh host\_name
