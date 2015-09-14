function [ output_args ] = detect( image_path, bbox_method, visualize )
    addpath(genpath('.'));

    % ------------------------------------------------%
    % % % 
    % % % Choose Face Detector
    % % % 0: Tree-Based Face Detector (p204);
    % % % 1: Matlab Face Detector (or External Face Detector);
    % % % 2: Use Pre-computed Bounding Boxes
    % % % 
    % % % NOTES:
    % % % [a]   Option '0' is very accurate and suited for faces in the 'wild';
    % % %       But it is EXTREMELY slow!!!
    % % % [b]   Option '1' supports the functionality for incorporating
    % % %       YOUR OWN FACE DETECTOR WITH DRMF FITTING;
    % % %       Simply modify the function External_Face_Detector.m
    % % % 
    %------------------------------------------------%


    %------------------------------------------------%
    % % % Choose Visualize
    % % % 0: Do Not Display Fitting Results;
    % % % 1: Display Fitting Results and Pause of Inspection)
    % % % 

    %------------------------------------------------%


    %------------------------------------------------%
    % % % Load Test Images
    img_list=dir(image_path);
    data(1).name = img_list(1).name;
    data(1).img = im2double(imread(image_path));

    % % % Required Only for bbox_method = 2; 
    data(1).bbox = []; % Face Detection Bounding Box [x;y;w;h]

    % % % Initialization to store the results
    data(1).points = []; % MAT containing 66 Landmark Locations
    data(1).pose = []; % POSE information [Pitch;Yaw;Roll]
    %------------------------------------------------%


    %------------------------------------------------%
    %Run Demo

    clm_model='model/DRMF_Model.mat';
    load(clm_model);    
    data=DRMF(clm_model,data,bbox_method,visualize);  
    
    figure(1)
    cla, imagesc(data.img), hold on, axis image
    plot(data.points(:,1),data.points(:,2),'bo')
    print([image_path,'.png'],'-dpng')
    save([image_path,'.mat'] ,'data');
    %------------------------------------------------%
    output_args = data;
end

